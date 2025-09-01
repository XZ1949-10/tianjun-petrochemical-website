/**
 * 表单处理Hook - 统一的表单状态管理
 */
import { useState, useCallback, useRef } from 'react'
import { Form, message } from 'antd'

/**
 * 表单Hook - 封装Ant Design Form的常用操作
 * @param {Object} options - 配置选项
 */
export const useForm = (options = {}) => {
  const {
    initialValues = {},
    onSubmit,
    onSuccess,
    onError,
    validateTrigger = 'onChange',
    resetOnSuccess = true
  } = options

  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const formRef = useRef(null)

  // 提交表单
  const handleSubmit = useCallback(async (values) => {
    if (!onSubmit) return

    setLoading(true)
    setErrors({})

    try {
      const result = await onSubmit(values)
      
      if (resetOnSuccess) {
        form.resetFields()
      }
      
      message.success('提交成功')
      onSuccess?.(result, values)
      return result
    } catch (error) {
      console.error('表单提交失败:', error)
      
      // 处理字段验证错误
      if (error.response?.data?.errors) {
        const fieldErrors = error.response.data.errors
        setErrors(fieldErrors)
        form.setFields(
          Object.keys(fieldErrors).map(field => ({
            name: field,
            errors: [fieldErrors[field]]
          }))
        )
      } else {
        message.error(error.message || '提交失败')
      }
      
      onError?.(error, values)
      throw error
    } finally {
      setLoading(false)
    }
  }, [form, onSubmit, onSuccess, onError, resetOnSuccess])

  // 验证表单
  const validateForm = useCallback(async () => {
    try {
      const values = await form.validateFields()
      return { success: true, values }
    } catch (errorInfo) {
      return { success: false, errors: errorInfo }
    }
  }, [form])

  // 重置表单
  const resetForm = useCallback(() => {
    form.resetFields()
    setErrors({})
    setLoading(false)
  }, [form])

  // 设置字段值
  const setFieldValue = useCallback((field, value) => {
    form.setFieldsValue({ [field]: value })
  }, [form])

  // 设置多个字段值
  const setFieldsValue = useCallback((values) => {
    form.setFieldsValue(values)
  }, [form])

  // 获取字段值
  const getFieldValue = useCallback((field) => {
    return form.getFieldValue(field)
  }, [form])

  // 获取所有字段值
  const getFieldsValue = useCallback(() => {
    return form.getFieldsValue()
  }, [form])

  return {
    form,
    formRef,
    loading,
    errors,
    handleSubmit,
    validateForm,
    resetForm,
    setFieldValue,
    setFieldsValue,
    getFieldValue,
    getFieldsValue
  }
}

/**
 * 文件上传Hook
 * @param {Object} options - 配置选项
 */
export const useFileUpload = (options = {}) => {
  const {
    maxSize = 10 * 1024 * 1024, // 10MB
    acceptedTypes = [],
    multiple = false,
    onUpload,
    onSuccess,
    onError
  } = options

  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadedFiles, setUploadedFiles] = useState([])

  // 验证文件
  const validateFile = useCallback((file) => {
    // 检查文件大小
    if (file.size > maxSize) {
      message.error(`文件大小不能超过 ${(maxSize / 1024 / 1024).toFixed(1)}MB`)
      return false
    }

    // 检查文件类型
    if (acceptedTypes.length > 0) {
      const fileType = file.type
      const isAccepted = acceptedTypes.some(type => {
        if (type.startsWith('.')) {
          return file.name.toLowerCase().endsWith(type.toLowerCase())
        }
        return fileType.includes(type)
      })

      if (!isAccepted) {
        message.error(`只支持 ${acceptedTypes.join(', ')} 格式的文件`)
        return false
      }
    }

    return true
  }, [maxSize, acceptedTypes])

  // 上传文件
  const uploadFile = useCallback(async (file) => {
    if (!validateFile(file)) return false

    setUploading(true)
    setUploadProgress(0)

    try {
      const result = await onUpload(file, {
        onProgress: (progress) => {
          setUploadProgress(progress)
        }
      })

      const fileInfo = {
        uid: Date.now().toString(),
        name: file.name,
        status: 'done',
        url: result.url,
        response: result
      }

      setUploadedFiles(prev => 
        multiple ? [...prev, fileInfo] : [fileInfo]
      )

      message.success('文件上传成功')
      onSuccess?.(result, file)
      return result
    } catch (error) {
      console.error('文件上传失败:', error)
      message.error(error.message || '文件上传失败')
      onError?.(error, file)
      throw error
    } finally {
      setUploading(false)
      setUploadProgress(0)
    }
  }, [validateFile, onUpload, onSuccess, onError, multiple])

  // 删除文件
  const removeFile = useCallback((uid) => {
    setUploadedFiles(prev => prev.filter(file => file.uid !== uid))
  }, [])

  // 清空文件
  const clearFiles = useCallback(() => {
    setUploadedFiles([])
  }, [])

  return {
    uploading,
    uploadProgress,
    uploadedFiles,
    uploadFile,
    removeFile,
    clearFiles
  }
}

/**
 * 表单验证Hook
 * @param {Object} rules - 验证规则
 */
export const useValidation = (rules = {}) => {
  const [errors, setErrors] = useState({})
  const [isValid, setIsValid] = useState(true)

  // 验证单个字段
  const validateField = useCallback((field, value) => {
    const rule = rules[field]
    if (!rule) return true

    let error = null

    // 必填验证
    if (rule.required && (!value || (typeof value === 'string' && value.trim() === ''))) {
      error = rule.message || `${field} 是必填项`
    }

    // 最小长度验证
    if (!error && rule.minLength && value && value.length < rule.minLength) {
      error = `${field} 最少需要 ${rule.minLength} 个字符`
    }

    // 最大长度验证
    if (!error && rule.maxLength && value && value.length > rule.maxLength) {
      error = `${field} 最多只能 ${rule.maxLength} 个字符`
    }

    // 正则验证
    if (!error && rule.pattern && value && !rule.pattern.test(value)) {
      error = rule.message || `${field} 格式不正确`
    }

    // 自定义验证
    if (!error && rule.validator && value) {
      try {
        const result = rule.validator(value)
        if (result !== true) {
          error = result || `${field} 验证失败`
        }
      } catch (e) {
        error = e.message || `${field} 验证失败`
      }
    }

    setErrors(prev => ({
      ...prev,
      [field]: error
    }))

    return !error
  }, [rules])

  // 验证所有字段
  const validateAll = useCallback((values) => {
    const newErrors = {}
    let allValid = true

    Object.keys(rules).forEach(field => {
      const isFieldValid = validateField(field, values[field])
      if (!isFieldValid) {
        allValid = false
      }
    })

    setIsValid(allValid)
    return allValid
  }, [rules, validateField])

  // 清除错误
  const clearError = useCallback((field) => {
    setErrors(prev => {
      const newErrors = { ...prev }
      delete newErrors[field]
      return newErrors
    })
  }, [])

  // 清除所有错误
  const clearAllErrors = useCallback(() => {
    setErrors({})
    setIsValid(true)
  }, [])

  return {
    errors,
    isValid,
    validateField,
    validateAll,
    clearError,
    clearAllErrors
  }
}