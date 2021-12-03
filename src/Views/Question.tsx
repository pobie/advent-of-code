import { Box, Code, Heading, HStack, Link } from '@chakra-ui/layout';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Tab,
  VStack,
} from '@chakra-ui/react';
import { Textarea } from '@chakra-ui/textarea';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import { AvailableQuestions } from '../Questions/AvailableQuestions';
import { Solvers } from '../Questions/Solvers';
import Solver from '../Questions/Solver';

function Question() {
  const params = useParams();
  let navigate = useNavigate();
  const [test, setTest] = useState('');
  const [selectedSolver, setSelectedSolver] = useState(0);
  const [solvers, setSolvers] = useState<Solver<any>[]>([]);
  const { t } = useTranslation();
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  function onSelectedSolverChange(event: React.ChangeEvent<HTMLSelectElement>) {
    event.preventDefault();
    setSelectedSolver(+event.target.value);
  }
  function onProblemInputChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    event.preventDefault();
    setInput(event.target.value);
  }
  function onClickRun() {
    setOutput(solvers[selectedSolver].solve(input));
  }
  useEffect(() => {
    if (params.id) {
      setSolvers(Solvers[params.id]);
    }
  }, [params.id]);
  useEffect(() => {
    fetch(`/question_${params.id}_input.txt`).then((response) => {
      response.text().then((text) => {
        setInput(text);
        // const id = params.id ? params.id : '0';
        // Solvers[id].forEach((solver) => console.log(solver.solve(text)));
      });
    });
    if (!params.id || !AvailableQuestions.includes(+params.id)) {
      navigate('/');
    }
    fetch(`/question_${params.id}_solution.txt`).then((response) => {
      response.text().then((text) => {
        setTest(text);
      });
    });
  }, []);
  return (
    <VStack textAlign="left" alignItems="flex-start" height="100%">
      <Heading>
        Question {params.id} -{' '}
        <Link
          target="_blank"
          color="teal.500"
          href={`https://adventofcode.com/2021/day/${params.id}`}
        >
          {t(`questions.${params.id}.title`)}
        </Link>
      </Heading>
      <HStack
        flex="1"
        height="50%"
        alignItems="flex-start"
        justifyContent="flex-start"
        spacing="32px"
      >
        <Code
          height="100%"
          w="30vw"
          borderWidth="1px"
          borderRadius="lg"
          whiteSpace="pre-wrap"
          overflow="scroll"
        >
          {test}
        </Code>
        <Box
          flexGrow="1"
          h="100%"
          borderWidth="1px"
          borderRadius="lg"
          padding="16px"
          maxH="50vh"
        >
          <VStack
            alignItems="center"
            justifyContent="center"
            justifyItems="center"
            w="100%"
            h="100%"
          >
            <FormControl flexGrow="2" w="100%" h="100%">
              <VStack w="100%" h="100%" alignItems="flex-start">
                <FormLabel>Input</FormLabel>
                <Textarea
                  height="100%"
                  value={input}
                  onChange={onProblemInputChange}
                />
                <HStack
                  width="100%"
                  alignItems="flex-end"
                  alignContent="flex-end"
                  justifyItems="flex-end"
                  justifyContent="flex-end"
                >
                  <Select
                    value={selectedSolver}
                    onChange={onSelectedSolverChange}
                  >
                    {solvers.map((_solver, index) => {
                      return (
                        <option key={index} value={index}>
                          Solution {index + 1}
                        </option>
                      );
                    })}
                  </Select>
                  <Button onClick={onClickRun}>Run</Button>
                </HStack>
              </VStack>
            </FormControl>
            <FormControl flexGrow="1">
              <VStack alignItems="flex-start">
                <FormLabel>Output</FormLabel>
                <Input
                  readOnly
                  placeholder="Press run to see result"
                  value={output}
                />
              </VStack>
            </FormControl>
          </VStack>
        </Box>
      </HStack>
    </VStack>
  );
}

export default Question;
