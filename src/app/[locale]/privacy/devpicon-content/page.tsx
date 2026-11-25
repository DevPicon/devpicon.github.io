import ContentDocumentPage, { contentDocumentMetadata, type ContentDocumentPageProps } from '@/components/ContentDocumentPage';

export function generateMetadata({ params }: ContentDocumentPageProps) {
  return contentDocumentMetadata(params.locale, 'privacy');
}

export default function DevPiconContentPrivacyPage(props: ContentDocumentPageProps) {
  return <ContentDocumentPage {...props} document="privacy" />;
}
