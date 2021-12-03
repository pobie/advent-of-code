import { Center, Link, ListItem, UnorderedList } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import { AvailableQuestions } from '../Questions/AvailableQuestions';

function Home() {
  const questions = AvailableQuestions;
  const { t } = useTranslation();

  return (
    <Center h="full" w="full">
      <UnorderedList listStyleType="none" margin="0">
        {questions.map((_question, index) => (
          <ListItem key={_question} textAlign="left">
            <Link
              as={RouterLink}
              to={`/question/${_question}`}
              color="teal.500"
            >
              {_question} : {t(`questions.${_question}.title`)}
            </Link>
          </ListItem>
        ))}
      </UnorderedList>
    </Center>
  );
}

export default Home;
