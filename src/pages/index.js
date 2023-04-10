import Image from 'next/image'
import { Inter } from 'next/font/google'
import Head from 'next/head'

import Layout from '../../component/Layout'
import { useState } from 'react'

import AppContext from '../../context/appContext'

const inter = Inter({ subsets: ['latin'] })

export default function Home(users) {

  const [myUsers, setMyUsers] = useState(users);
  
  return (
    <>
      <Head>
              
              <meta charSet="UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
              <meta name="Description" content="NextJS MySQL CRUD tutorial"/>
              <meta name="author" content = "anand346@BePractical" />
              <meta name="og:url" content = "https://www.linkedin.com/in/anand346" />
              
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">

        <AppContext.Provider value={{users: myUsers, setMyUsers: setMyUsers}}>
          <Layout/>
        </AppContext.Provider>
        
      </main>
    </>
  )
}


export async function getServerSideProps() {

  const response = await  fetch("http://localhost:3000/api/users");
  const users = await response.json();

  return {
    props : {
      users: users
    }
  }

}