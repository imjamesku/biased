import Link from "next/link";
import Layout from "../src/components/Layout/Layout";
import styles from "./index.module.scss";
import TopicList from "../src/components/TopicList/TopicList";

const IndexPage = () => {
  return (
    <Layout title="Cast your vote now ! | imbiased">
      <h1>Which side is BETTER?</h1>
      <TopicList />
    </Layout>
  );
};

export default IndexPage;
