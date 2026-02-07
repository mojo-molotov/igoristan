import ChaoticForm from '@/components/ChaoticForm';
import BackToHome from '@/components/BackToHome';
import Main from '@/fragments/Main';

const ChaoticFormPage = () => {
  return (
    <Main>
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-2 text-center text-4xl font-extrabold text-gray-900">Sacred Corsican Registration</h1>

        <ChaoticForm />

        <p className="mt-6 text-center text-sm text-gray-500">
          "Blessed are the Corsicans, for they shall inherit the Mediterranean" - Napoleon 4:20
        </p>

        <BackToHome className="mx-auto mt-4 flex w-fit" />
      </div>
    </Main>
  );
};

export default ChaoticFormPage;
