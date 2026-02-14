import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Modal, Button, Form as BootstrapForm } from 'react-bootstrap';
import { useRenameChannelMutation } from '../../../store/api/chatApi';
import { closeModal } from '../../../store/slices/modalsSlice';

const RenameChannelModal = () => {
  const dispatch = useDispatch();
  const [renameChannel, { isLoading }] = useRenameChannelMutation();
  const { channelId } = useSelector((state) => state.modals);
  const channels = useSelector((state) => state.channels.items);
  const currentChannel = channels.find((ch) => ch.id === channelId);
  const inputRef = useRef(null);

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов')
      .required('Обязательное поле')
      .test('unique', 'Канал с таким именем уже существует', (value) => {
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
        <Modal.Title>Переименовать канал</Modal.Title>
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
                <BootstrapForm.Label>Новое имя канала</BootstrapForm.Label>
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
                Отмена
              </Button>
              <Button
                type="submit"
                variant="primary"
                disabled={isLoading || isSubmitting || !isValid}
              >
                {isLoading ? 'Переименование...' : 'Переименовать'}
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default RenameChannelModal;
