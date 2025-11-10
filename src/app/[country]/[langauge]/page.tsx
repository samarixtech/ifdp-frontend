interface CountryLanguagePageProps {
  params: Promise<{ country: string; language: string }>;
}

const CountryLanguagePage = async ({ params }: CountryLanguagePageProps) => {
  const { country, language } = await params;

  return (
    <div className="flex min-h-screen items-center justify-center">
      <h1>
        Country: {country}, Language: {language}
      </h1>
    </div>
  );
};

export default CountryLanguagePage;
