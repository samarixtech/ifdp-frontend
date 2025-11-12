import Banner from "@/app/banner/page";
interface CountryLanguagePageProps {
  params: Promise<{ country: string; language: string }>;
}

const CountryLanguagePage = async ({ params }: CountryLanguagePageProps) => {
  const { country, language } = await params;

  return (
    <div className="">

        <Banner />
      {/* <h1>
        Country: {country}, Language: {language}
      </h1> */}
    </div>
  );
};

export default CountryLanguagePage;
