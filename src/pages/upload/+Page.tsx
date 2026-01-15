import { ImagesDropzoneProvider } from '@/components/FakeUpload/ImagesDropzoneContext';
import FakeUploadForm from '@/components/FakeUpload/Form';
import Main from '@/fragments/Main';
import H1 from '@/fragments/H1';

const Upload = () => (
  <Main>
    <H1 className="text-center">Upload images!</H1>

    <ImagesDropzoneProvider>
      <FakeUploadForm />
    </ImagesDropzoneProvider>
  </Main>
);

export default Upload;
