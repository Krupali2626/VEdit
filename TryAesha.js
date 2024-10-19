import React, { useState } from 'react';
import { Button, TextField, MenuItem, Box, Typography } from '@mui/material';

const MultiStepSignupForm = () => {
  // State to manage the current step and form data
  const [step, setStep] = useState(1);
  const [profession, setProfession] = useState('');
  const [securityQuestions, setSecurityQuestions] = useState({
    question1: '',
    question2: '',
    question3: '',
  });
  const [securityAnswers, setSecurityAnswers] = useState({
    answer1: '',
    answer2: '',
    answer3: '',
  });

  // Profession options
  const professionOptions = ['Student', 'Video Editor', 'Cinematographer', 'Other'];

  // Security question options
  const questionOptions = [
    'What was the name of your first pet?',
    'In what city were you born?',
    'What is your mother\'s maiden name?',
    'What was the make of your first car?',
    'What elementary school did you attend?',
  ];

  // Handle profession change
  const handleProfessionChange = (event) => {
    setProfession(event.target.value);
  };

  // Handle security question change
  const handleQuestionChange = (event, questionNumber) => {
    setSecurityQuestions({ ...securityQuestions, [questionNumber]: event.target.value });
  };

  // Handle security answer change
  const handleAnswerChange = (event, answerNumber) => {
    setSecurityAnswers({ ...securityAnswers, [answerNumber]: event.target.value });
  };

  // Handle "Let's Start" button click
  const handleStart = () => {
    setStep(2);
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Submitted Data:', { profession, securityQuestions, securityAnswers });
    // Add your submission logic here
  };

  // Render profession selection step
  const renderProfessionStep = () => (
    <Box>
      <Typography variant="h6" color="white" gutterBottom>
        Select Profession
      </Typography>
      <TextField
        select
        label="Profession"
        value={profession}
        onChange={handleProfessionChange}
        fullWidth
        variant="outlined"
        sx={{
          marginBottom: 2,
          '& .MuiOutlinedInput-root': {
            color: 'white',
            '& fieldset': { borderColor: 'white' },
            '&:hover fieldset': { borderColor: 'white' },
            '&.Mui-focused fieldset': { borderColor: 'white' },
          },
          '& .MuiInputLabel-root': { color: 'white' },
          '& .MuiSelect-icon': { color: 'white' },
        }}
      >
        {professionOptions.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
      <Button
        onClick={handleStart}
        variant="contained"
        fullWidth
        disabled={!profession}
        sx={{
          backgroundColor: 'white',
          color: 'black',
          '&:hover': { backgroundColor: 'grey' },
        }}
      >
        Let's Start
      </Button>
    </Box>
  );

  // Render security questions step
  const renderSecurityQuestionsStep = () => (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="h6" color="white" gutterBottom>
        Security Questions
      </Typography>
      {[1, 2, 3].map((num) => (
        <Box key={num} sx={{ marginBottom: 2 }}>
          <TextField
            select
            label={`Security Question ${num}`}
            value={securityQuestions[`question${num}`]}
            onChange={(e) => handleQuestionChange(e, `question${num}`)}
            fullWidth
            variant="outlined"
            sx={{
              marginBottom: 1,
              '& .MuiOutlinedInput-root': {
                color: 'white',
                '& fieldset': { borderColor: 'white' },
                '&:hover fieldset': { borderColor: 'white' },
                '&.Mui-focused fieldset': { borderColor: 'white' },
              },
              '& .MuiInputLabel-root': { color: 'white' },
              '& .MuiSelect-icon': { color: 'white' },
            }}
          >
            {questionOptions.map((option, index) => (
              <MenuItem key={index} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label={`Your Answer ${num}`}
            value={securityAnswers[`answer${num}`]}
            onChange={(e) => handleAnswerChange(e, `answer${num}`)}
            fullWidth
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                color: 'white',
                '& fieldset': { borderColor: 'white' },
                '&:hover fieldset': { borderColor: 'white' },
                '&.Mui-focused fieldset': { borderColor: 'white' },
              },
              '& .MuiInputLabel-root': { color: 'white' },
            }}
          />
        </Box>
      ))}
      <Button
        type="submit"
        variant="contained"
        fullWidth
        sx={{
          backgroundColor: 'white',
          color: 'black',
          '&:hover': { backgroundColor: 'grey' },
        }}
      >
        Submit
      </Button>
    </Box>
  );

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 400,
        margin: 'auto',
        padding: 3,
        backgroundColor: 'black',
        borderRadius: 2,
        border: '1px solid white',
      }}
    >
      {step === 1 ? renderProfessionStep() : renderSecurityQuestionsStep()}
    </Box>
  );
};

export default MultiStepSignupForm;