import { useTranslation } from 'react-i18next';
import { HomeProductSection } from './HomeProductSection';

export function FeaturedProductsSection() {
  const { t } = useTranslation('home');
  return (
    <HomeProductSection
      eyebrow={t('featured.eyebrow')}
      title={t('featured.title')}
      subtitle={t('featured.subtitle')}
      href="/shop"
      queryKind="rating"
      tone="mist"
    />
  );
}
