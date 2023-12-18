import React, { useContext } from 'react'
import { formContext } from '../../context/FormContext'
import { WordNorwegian } from './WordNorwegian'
import { PhraseNorwegian } from './PhraseNorwegian';
import { SentenceNorwegian } from './SentenceNorwegian';

export const BackCard = () => {
  const { select,option } = useContext(formContext);
  return (
    <>
    
      {option=="Words"&&<WordNorwegian/>}
      {option=="Phrases"&&<PhraseNorwegian/>}
      {option=="Sentence"&&<SentenceNorwegian/>}
    </>
  )
}
