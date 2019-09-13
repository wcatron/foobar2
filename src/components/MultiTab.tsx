import React, { useState } from 'react'
import { AuthoredComponent } from '../Authorable'
import { AuthorableArea } from '../AuthorableArea'
import { useContent } from '../ContentStore'
import { AuthoredParagraph } from './Paragraph'

const MultiTabContentType = 'MultiTab';

export const MultiTab:React.FC<{ defaultNumberOfTabs: number, defaultText?: string } & AuthoredComponent> = (props) => {
  const [ loading, error, content ] = useContent(MultiTabContentType, props.contentId, {
    tabs: Array(props.defaultNumberOfTabs).fill(null).map((_, index) => {
      return `Tab#${index + 1}`;
    }),
    numberOfTabs: props.defaultNumberOfTabs
  })
  const [ currentIndex, setCurrentIndex ] = useState(0)

  if (loading) {
    return <div>Loading...</div>
  }

  return <AuthorableArea contentId={props.contentId} contentType={MultiTabContentType} error={error} defaultContent={content}>
    {content.tabs.map((tab, index) => {
      return <div style={currentIndex === index ? {} : { display: 'none'}}>
        <AuthoredParagraph key={index} contentId={props.contentId + tab} defaultText={props.defaultText || 'Put your tab text here.'} />
      </div>
    })}
    <button onClick={(e) => {
      e.stopPropagation()
      let next = (currentIndex - 1);
      if (next < 0) {
        next = content.numberOfTabs - 1;
      }
      setCurrentIndex(next);
    }}>Left</button> <button onClick={(e) => {
      e.stopPropagation()
      setCurrentIndex((currentIndex + 1) % content.numberOfTabs);
    }}>Right</button> {currentIndex + 1} / {content.numberOfTabs}
  </AuthorableArea>
}