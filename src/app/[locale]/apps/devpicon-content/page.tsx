import ContentDocumentPage, { contentDocumentMetadata, type ContentDocumentPageProps } from '@/components/ContentDocumentPage';

export function generateMetadata({ params }: ContentDocumentPageProps) {
  return contentDocumentMetadata(params.locale, 'overview');
}

export default function DevPiconContentPage(props: ContentDocumentPageProps) {
  return <ContentDocumentPage {...props} document="overview" />;
}
