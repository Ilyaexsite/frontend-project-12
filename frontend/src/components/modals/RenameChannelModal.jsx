import { Button, Modal, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef, useContext, useCallback } from 'react'
import { useFormik } from 'formik'
import { useTranslation } from 'react-i18next'
import { setStatusChannelModal } from '../../store/slices/modalsSlice'
import { renameChannelById } from '../../store/slices/channelsSlice'
import { channelSchema } from '../../utils/validation/validationForm'
import FilterContext from '../../utils/context/FilterContext'

const RenameChannelModal = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const { activeChannelId } = useSelector(({ ui }) => ui.modals)
  const modalStatus = useSelector(({ ui }) => ui.modals.renameChannelModal)
  const token = useSelector(({ auth }) => auth.token)
  const channelsData = useSelector(({ channels }) => channels.channelsData)
  const currentChannel = channelsData.find(channel => channel.id === activeChannelId)
  const filter = useContext(FilterContext)

  const inputRef = useRef(null)

  const handleCloseModal = useCallback(() => {
    dispatch(setStatusChannelModal({
      modalName: 'renameChannelModal',
      status: false,
      channelId: null,
    }))
  }, [dispatch])

  const handleSubmit = useCallback(async (values, { resetForm, setFieldError }) => {
    const cleanChannelName = filter.clean(values.name.trim())
    const editedChannel = { name: cleanChannelName }

    try {
      await dispatch(renameChannelById({
        token,
        id: currentChannel.id,
        editedChannel,
      })).unwrap(),
      handleCloseModal()
      resetForm()
    }
    catch (error) {
      if (error.message?.includes('409')) {
        setFieldError('name', t('renameChannelModal.errors.alreadyExists'))
      }
      else {
        setFieldError('name', t('renameChannelModal.errors.generic'))
      }
    }
  }, [filter, token, currentChannel?.id, dispatch, handleCloseModal, t])

  useEffect(() => {
    if (inputRef.current && modalStatus) {
      inputRef.current.focus()
    }
  }, [modalStatus])

  const formik = useFormik({
    initialValues: {
      name: currentChannel?.name?.trim() || '',
    },
    validationSchema: channelSchema(channelsData, t, currentChannel?.name),
    onSubmit: handleSubmit,
    enableReinitialize: true,
  })

  return (
    <Modal
      show={modalStatus}
      onHide={handleCloseModal}
      dialogClassName="modal-dialog-centered"
    >
      <Modal.Header>
        <Modal.Title>{t('renameChannelModal.title')}</Modal.Title>
        <Button
          aria-label="Close"
          data-bs-dismiss="modal"
          variant="close"
          onClick={handleCloseModal}
        />
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control
              ref={inputRef}
              onFocus={() => inputRef.current?.select()}
              name="name"
              id="name"
              className="mb-2"
              placeholder={t('renameChannelModal.placeholder')}
              onChange={formik.handleChange}
              value={formik.values.name}
              isInvalid={formik.errors.name && formik.touched.name}
              disabled={formik.isSubmitting}
            />
            <label className="visually-hidden" htmlFor="name">
              {t('renameChannelModal.hidden_title')}
            </label>
            <Form.Control.Feedback type="invalid">
              {formik.errors.name}
            </Form.Control.Feedback>
            <div className="d-flex justify-content-end">
              <Button
                variant="secondary"
                className="me-2"
                onClick={handleCloseModal}
                disabled={formik.isSubmitting}
              >
                {t('renameChannelModal.cancel')}
              </Button>
              <Button
                type="submit"
                disabled={!formik.values.name.trim() || formik.isSubmitting}
              >
                {formik.isSubmitting ? t('renameChannelModal.submitting') : t('renameChannelModal.submit')}
              </Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default RenameChannelModal
