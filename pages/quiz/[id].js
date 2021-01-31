
import QuizScreen from '../../src/screens/Quiz';

export default function QuizDaGaleraPage({dbExterno}) {
  return (
    <div>
      <QuizScreen 
            externalQuestions={dbExterno.questions}
            externalBg={dbExterno.bg}
      />
    </div>
  );
}

export async function getServerSideProps(context) {
  const [projectName, githubUser] = context.query.id.split('___');
  const dbExterno = await fetch(`https://${projectName}.${githubUser}.vercel.app/api/db`)
    .then((res) => {
      if(res.ok) {
        return res.json();
      }
      throw new Error('Falha em pegar os dados');
    })
    .then((resConvertida) => {
      return resConvertida;
    })
    .catch((err) => {
      //redrect
      throw new Error('----------------------------------------------' + err);
    })

  return {
    props: {
      dbExterno,
    },
  };
}