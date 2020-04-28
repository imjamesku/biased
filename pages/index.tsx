import Link from 'next/link'
import Layout from '../src/components/Layout'
import { Topic } from '../src/types/Topics'
import TopicBox from '../src/components/TopicBox/TopicBox'
import styles from './index.module.scss'

const IndexPage = () => {
  const dummyData: Topic[] = [
    {
      question: "Cat or dog?",
      firstOption: {
        name: "Dogs are the best!",
        users: ["kevin"]
      },
      secondOption: {
        name: "Cats are cool",
        users: ["james", "tide"]
      }
    },
    {
      question: "Cat or dog?",
      firstOption: {
        name: "dog",
        users: ["james", "tide", "kevin"]
      },
      secondOption: {
        name: "cat",
        users: []
      }
    },
    {
      question: "Cat or dog?",
      firstOption: {
        name: "dog",
        users: ["kevin"]
      },
      secondOption: {
        name: "cat",
        users: ["james", "tide"]
      }
    },
    {
      question: "Cat or dog?",
      firstOption: {
        name: "dog",
        users: []
      },
      secondOption: {
        name: "cat",
        users: []
      }
    }
  ]
  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <h1>Which side is BETTER? 👋</h1>
      <p>
        <div className={styles.topicList}>
          {dummyData.map((topicData, index) => <TopicBox key={index} {...topicData} />)}
        </div>
      </p>
    </Layout>
  )
}

export default IndexPage
