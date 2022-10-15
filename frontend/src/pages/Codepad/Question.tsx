import React from 'react'
import Parser from 'html-react-parser'
import {
  Card,
  CardContent,
  Typography,
  Link,
  List,
  ListItem,
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

const Question = ({ question }: QuestionProps) => {
  return (
    <Card>
      <CardContent>
        <Typography>
          Title:{' '}
          <Link href={question.url} underline="always" target="_blank">
            {question.title}
          </Link>
        </Typography>

        <Typography>Difficulty: {question.difficulty}</Typography>

        <Typography>{question.prompt}</Typography>

        <Typography>Examples:</Typography>
        <List
          disablePadding={true}
          dense={true}
          sx={{ listStyleType: 'disc', pl: 4 }}
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

        <Typography>Constraints:</Typography>
        <List
          disablePadding={true}
          dense={true}
          sx={{ listStyleType: 'disc', pl: 4 }}
        >
          {question.constraints &&
            question.constraints.map((x, idx) => (
              <ListItem key={idx} sx={{ display: 'list-item' }}>
                <Typography>{Parser(x.replaceAll('\n', '<br>'))}</Typography>
              </ListItem>
            ))}
        </List>

        <Typography>Related Topics:</Typography>
        <Typography>
          {question.related_topics && question.related_topics.join(', ')}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default Question
