import React from 'react';
import { AuthoredComponent } from './Authorable'
import { Paragraph } from './common/Paragraph'
import { AuthoredHeader } from './components/Header'
import { AuthoredParagraph } from './components/Paragraph'
import { MultiTab } from './components/MultiTab'

export const PageComponentA:React.FC<AuthoredComponent> = (props) => {
  return <>
    <AuthoredHeader contentId='header' defaultText='Default value.' />
    <Paragraph>Static hard coded content.</Paragraph>
    <AuthoredParagraph contentId='primary' defaultText='Default value.' />
    <MultiTab contentId='tabber' defaultNumberOfTabs={5} />
    <AuthoredParagraph contentId='lower' defaultText='The lower text.' />
  </>
}