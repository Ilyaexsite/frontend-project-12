import { useFormik } from 'formik'
import { useTranslation } from 'react-i18next'
import { Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useCallback, useContext } from 'react'
import { setStatusChannelModal } from '../store/slices/modalsSlice'
import { channelSchema } from '../utils/validation/validationForm'
import { createChannelsByToken } from '../store/slices/channelsSlice'
import FilterContext from '../utils/context/FilterContext'

const ChannelForm = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const token = useSelector(({ auth }) => auth.token)
  const channelsData = useSelector(({ channels }) => channels.channelsData)
  const filter = useContext(FilterContext)

  const handleCloseModal = useCallback(() => {
    dispatch(setStatusChannelModal({ modalName: 'addChannelModal', status: false }))
  }, [dispatch])

  const handleSubmit = useCallback(async (values, { resetForm, setFieldError }) => {
    const cleanChannelName = filter.clean(values.name.trim())
    const newChannel = { name: cleanChannelName }

    try {
      await dispatch(createChannelsByToken({ token, newChannel })).unwrap()
      handleCloseModal()
      resetForm()
    }
    catch (error) {
      if (error.message?.includes('409')) {
        setFieldError('name', t('channelForm.errors.alreadyExists'))
      }
      else {
        setFieldError('name', t('channelForm.errors.generic'))
      }
    }
  }, [filter, token, dispatch, handleCloseModal, t])

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: channelSchema(channelsData, t),
    onSubmit: handleSubmit,
  })

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Group>
        <Form.Control
          name="name"
          id="name"
          className="mb-2"
          onChange={formik.handleChange}
          value={formik.values.name}
          isInvalid={formik.errors.name && formik.touched.name}
          placeholder={t('channelForm.label')}
          autoFocus
          disabled={formik.isSubmitting}
        />
        <label className="visually-hidden" htmlFor="name">
          {t('channelForm.label')}
        </label>
        {formik.errors.name && (
          <Form.Control.Feedback type="invalid">
            {formik.errors.name}
          </Form.Control.Feedback>
        )}
        <div className="d-flex justify-content-end">
          <Button
            variant="secondary"
            className="me-2"
            onClick={handleCloseModal}
            disabled={formik.isSubmitting}
          >
            {t('channelForm.cancel')}
          </Button>
          <Button
            type="submit"
            disabled={!formik.values.name.trim() || formik.isSubmitting}
          >
            {formik.isSubmitting ? t('channelForm.submitting') : t('channelForm.submit')}
          </Button>
        </div>
      </Form.Group>
    </Form>
  )
}

export default ChannelForm
