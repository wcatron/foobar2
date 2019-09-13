import React, { useState } from 'react';
import { AuthoredComponent } from "../Authorable";
import { useContentEditor, useContent } from "../ContentStore";
import { AuthorableArea } from "../AuthorableArea";
import { Paragraph } from '../common/Paragraph';

const AuthoredParagraphContentType = 'Paragraph';

export const AuthoredParagraph:React.FC<{
  defaultText: string
} & AuthoredComponent> = (props) => {
  const [ loading, error, content ] = useContent(AuthoredParagraphContentType, props.contentId, props.defaultText);
  const [ authoring ] = useContentEditor<string>(AuthoredParagraphContentType, props.contentId);
  const [ workingText, setWorkingText ] = useState(content);

  if (!authoring && content !== workingText) {
    // Keep working text up to date with content.
    setWorkingText(content)
  }

  return <AuthorableArea contentId={props.contentId} contentType={AuthoredParagraphContentType} defaultContent={content}>
    <Paragraph alignment='left'>{content}</Paragraph>
  </AuthorableArea>
}