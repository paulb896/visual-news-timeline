import * as React from 'react';
import * as Renderer from 'react-test-renderer';
import Article from './Article';

test('Article renders correctly', () => {
  const tree = Renderer
    .create(<Article 
        key={ "unique-article-id" }
        id={ "unique-article-id" }
        articleBody={ "At five seconds past midnight, Ian Power became the owner of the first gram of recreational cannabis to be sold in Canada. After waiting for hours in the cold, Power strode excitedly into the only cannabis store open in St John’s, Newfoundland, and made his purchase." }
        publishedAt={ "2018-10-17T18:41:34Z" }
        url={ "https://www.theguardian.com/world/2018/oct/17/on-a-high-canada-celebrates-cannabis-being-legalised" }
        headline={ "On a high: Canada celebrates cannabis being legalised" } />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});