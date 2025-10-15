import Link from "next/link";
import { Mail, Goal } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white py-12">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-16 pt-8">
          <h1 className="text-5xl font-extrabold text-white mb-4">
            O Piłkarskim Magazynie ⚽
          </h1>
          <p className="text-xl text-red-600 font-semibold">
            Twoja brama do świata profesjonalnych analiz piłkarskich.
          </p>
        </header>

        <section className="mb-12 bg-gray-800 p-8 rounded-xl shadow-2xl">
          <div className="flex items-start mb-4">
            <Goal className="w-8 h-8 text-red-600 mr-4 mt-1 flex-shrink-0" />
            <div>
              <h2 className="text-3xl font-bold mb-2">Nasza Misja</h2>
              <p className="text-gray-300 leading-relaxed">
                Naszym celem jest dostarczanie czytelnikom dogłębnych,
                obiektywnych analiz i newsów, które wykraczają poza nagłówki.
                Skupiamy się na taktyce, statystykach i historycznym kontekście,
                aby pomóc Ci lepiej zrozumieć grę. Nie jesteśmy tylko kolejnym
                blogiem sportowym – jesteśmy Twoim partnerem w analizie futbolu.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 border-b-2 border-red-600 pb-2">
            Poznaj Redakcję
          </h2>
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
            <div className="flex items-center space-x-6">
              <div className="w-20 h-20 bg-gray-600 rounded-full flex items-center justify-center text-red-600 text-3xl font-bold">
                A
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Adam Piłkarz</h3>
                <p className="text-red-500 mb-2">
                  Założyciel i Główny Analityk
                </p>
                <p className="text-gray-400 text-sm">
                  Z ponad 10-letnim doświadczeniem w pisaniu o Ekstraklasie i
                  europejskich pucharach. Specjalizuje się w statystykach xG
                  oraz analizie obrony pozycyjnej.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="text-center bg-red-600/10 p-8 rounded-xl border border-red-600">
          <Mail className="w-10 h-10 mx-auto text-red-600 mb-3" />
          <h2 className="text-3xl font-bold mb-4 text-red-400">
            Masz Pytanie?
          </h2>
          <p className="text-lg mb-6 text-gray-300">
            Skontaktuj się z nami w sprawie współpracy, propozycji tematów lub
            krytyki.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-red-600 text-white font-bold py-3 px-8 rounded-full hover:bg-red-700 transition shadow-lg"
          >
            Przejdź do formularza kontaktowego
          </Link>
        </section>
      </main>
    </div>
  );
}
