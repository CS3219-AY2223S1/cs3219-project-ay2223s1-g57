import React from 'react'
import Parser from 'html-react-parser'
import {
  Card,
  CardContent,
  Typography,
  Link,
  List,
  ListItem,
  Chip,
  Divider,
} from '@mui/material'

export type QuestionInfo = {
  title: string
  difficulty: string
  url: string
  prompt: string
  examples: Array<string>
  constraints: Array<string>
  related_topics: Array<string>
  similar_questions: Array<string>
}

type QuestionProps = {
  question: QuestionInfo
}

const getDifficultyTag = (difficulty: string) => {
  let color: 'success' | 'warning' | 'error' | 'default'
  switch (difficulty) {
    case 'easy':
      color = 'success'
      break
    case 'medium':
      color = 'warning'
      break
    case 'hard':
      color = 'error'
      break
    default:
      color = 'default'
      break
  }

  const capitalisedDifficulty = difficulty
    ? difficulty[0].toUpperCase() + difficulty.substring(1)
    : difficulty
  return <Chip label={capitalisedDifficulty} size="small" color={color} />
}

const Question = ({ question }: QuestionProps) => {
  return (
    <Card sx={{ boxShadow: '4', marginY: '1rem' }}>
      <CardContent>
        <Typography sx={{ mb: '0.25rem' }}>
          <b>Title: </b>
          <Link href={question.url} underline="always" target="_blank">
            {question.title}
          </Link>
        </Typography>

        <Typography sx={{ mb: '0.25rem' }}>
          <b>Difficulty: </b>
          {getDifficultyTag(question.difficulty)}
        </Typography>

        <Divider sx={{ marginY: '0.5rem' }} />

        <Typography sx={{ mb: '0.25rem' }}>{question.prompt}</Typography>

        <Divider sx={{ marginY: '0.5rem' }} />

        <Typography sx={{ fontWeight: 'bold', mb: '0.25rem' }}>
          Examples:
        </Typography>
        <List
          disablePadding={true}
          dense={true}
          sx={{ listStyleType: 'disc', pl: 4, mb: '0.25rem' }}
        >
          {question.examples &&
            question.examples.map((x, idx) => {
              return (
                <ListItem key={idx} sx={{ display: 'list-item' }}>
                  <Typography>{Parser(x.replaceAll('\n', '<br>'))}</Typography>
                </ListItem>
              )
            })}
        </List>

        <Typography sx={{ fontWeight: 'bold', mb: '0.25rem' }}>
          Constraints:
        </Typography>
        <List
          disablePadding={true}
          dense={true}
          sx={{ listStyleType: 'disc', pl: 4, mb: '0.25rem' }}
        >
          {question.constraints &&
            question.constraints.map((x, idx) => (
              <ListItem key={idx} sx={{ display: 'list-item' }}>
                <Typography>{Parser(x.replaceAll('\n', '<br>'))}</Typography>
              </ListItem>
            ))}
        </List>

        <Typography sx={{ fontWeight: 'bold' }}>Related Topics:</Typography>
        <Typography>
          {question.related_topics
            ? question.related_topics.map((topic) => {
                return (
                  <Chip
                    label={topic}
                    size="small"
                    color="primary"
                    sx={{ marginX: '0.25rem' }}
                  />
                )
              })
            : 'None'}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default Question
