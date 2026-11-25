import ContentDocumentPage, { contentDocumentMetadata, type ContentDocumentPageProps } from '@/components/ContentDocumentPage';

export function generateMetadata({ params }: ContentDocumentPageProps) {
  return contentDocumentMetadata(params.locale, 'terms');
}

export default function DevPiconContentTermsPage(props: ContentDocumentPageProps) {
  return <ContentDocumentPage {...props} document="terms" />;
}
