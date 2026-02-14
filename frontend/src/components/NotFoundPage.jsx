import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Container } from 'react-bootstrap';

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <Container className="text-center mt-5">
      <h1 style={{ fontSize: '72px', color: '#dc3545' }}>{t('notFound.title')}</h1>
      <h2 className="mb-3">{t('notFound.message')}</h2>
      <p className="text-muted mb-4">{t('notFound.description')}</p>
      <Link
        to="/"
        className="btn btn-primary"
      >
        {t('notFound.backHome')}
      </Link>
    </Container>
  );
};

export default NotFoundPage;
