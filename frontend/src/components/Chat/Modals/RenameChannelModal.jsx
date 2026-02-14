import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Modal, Button, Form as BootstrapForm } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useRenameChannelMutation } from '../../../store/api/chatApi';
import { closeModal } from '../../../store/slices/modalsSlice';

const RenameChannelModal = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [renameChannel, { isLoading }] = useRenameChannelMutation();
  const { channelId } = useSelector((state) => state.modals);
  const channels = useSelector((state) => state.channels.items);
  const currentChannel = channels.find((ch) => ch.id === channelId);
  const inputRef = useRef(null);

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, t('channels.errors.nameLength'))
      .max(20, t('channels.errors.nameLength'))
      .required(t('channels.errors.nameRequired'))
      .test('unique', t('channels.errors.nameExists'), (value) => {
        return !channels.some((ch) => ch.name === value && ch.id !== channelId);
      }),
  });

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await renameChannel({ id: channelId, name: values.name }).unwrap();
      dispatch(closeModal());
    } catch (error) {
      console.error('Failed to rename channel:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    dispatch(closeModal());
  };

  if (!currentChannel) return null;

  return (
    <Modal show centered onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.rename.title')}</Modal.Title>
      </Modal.Header>
      
      <Formik
        initialValues={{ name: currentChannel.name }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ isSubmitting, isValid }) => (
          <Form>
            <Modal.Body>
              <BootstrapForm.Group>
                <BootstrapForm.Label>
                  {t('channels.channelName')}
                </BootstrapForm.Label>
                <Field
                  innerRef={inputRef}
                  type="text"
                  name="name"
                  className="form-control"
                  disabled={isLoading}
                />
                <ErrorMessage name="name">
                  {(msg) => (
                    <div className="text-danger small mt-1">{msg}</div>
                  )}
                </ErrorMessage>
              </BootstrapForm.Group>
            </Modal.Body>
            
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                {t('common.cancel')}
              </Button>
              <Button
                type="submit"
                variant="primary"
                disabled={isLoading || isSubmitting || !isValid}
              >
                {isLoading ? t('common.sending') : t('modals.rename.button')}
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default RenameChannelModal;
