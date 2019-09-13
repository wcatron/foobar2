import React from 'react';

export const Paragraph:React.FC<{
  alignment?: 'center' | 'left'
}> = (props = {
  alignment: 'left'
}) => {
  return <p style={{
    textAlign: props.alignment
  }}>{props.children}</p>
}