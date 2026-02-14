import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Modal, Button, Form as BootstrapForm } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useAddChannelMutation } from '../../../store/api/chatApi';
import { closeModal } from '../../../store/slices/modalsSlice';
import { showSuccessToast, showErrorToast } from '../../../utils/toast';

const AddChannelModal = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [addChannel, { isLoading }] = useAddChannelMutation();
  const channels = useSelector((state) => state.channels.items);
  const inputRef = useRef(null);

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, t('channels.errors.nameLength'))
      .max(20, t('channels.errors.nameLength'))
      .required(t('channels.errors.nameRequired'))
      .test('unique', t('channels.errors.nameExists'), (value) => {
        return !channels.some((ch) => ch.name === value);
      }),
  });

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await addChannel({ name: values.name }).unwrap();
      showSuccessToast('channelAdded');
      dispatch(closeModal());
    } catch (error) {
      console.error('Failed to add channel:', error);
      showErrorToast('loadingError');
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    dispatch(closeModal());
  };

  return (
    <Modal show centered onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.add.title')}</Modal.Title>
      </Modal.Header>
      
      <Formik
        initialValues={{ name: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
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
                  placeholder={t('channels.channelNamePlaceholder')}
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
                {isLoading ? t('common.sending') : t('modals.add.button')}
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default AddChannelModal;
