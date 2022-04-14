import { GetStaticProps } from 'next';
import { useAllPrismicDocumentsByType } from '@prismicio/react'
import Head from 'next/head';
import * as prismic from '@prismicio/client'

import { prismicClient } from '../../services/prismic';
import styles from './styles.module.scss';

export default function Posts() {
  return(
    <>
      <Head>
        <title>Posts | Ignews</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          <a href="#">
            <time>15 de abril de 2022</time>
            <strong>Creating a Monorepo with Lerna & Yarn Workspace</strong>
            <p>In this guide, you will learn how to create a Monorepo to manage multiple packages with a shared build, tests and release process.</p>
          </a>
          <a href="#">
            <time>15 de abril de 2022</time>
            <strong>Creating a Monorepo with Lerna & Yarn Workspace</strong>
            <p>In this guide, you will learn how to create a Monorepo to manage multiple packages with a shared build, tests and release process.</p>
          </a>
          <a href="#">
            <time>15 de abril de 2022</time>
            <strong>Creating a Monorepo with Lerna & Yarn Workspace</strong>
            <p>In this guide, you will learn how to create a Monorepo to manage multiple packages with a shared build, tests and release process.</p>
          </a>
        </div>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await prismicClient.get({
    predicates: [
      prismic.predicate.at('document.type', 'post')
    ],
    fetch: ['publication.title', 'publication.content'],
    pageSize: 100,
  });

  console.log(response)

  return {
    props: {}
  }
}

