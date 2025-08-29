import { screen, render } from '@testing-library/react';
import { NewsItem } from './NewsItem';

import classes from './NewsItem.module.scss';

const mockProps = {
  url: 'https://www.cnbc.com/2025/08/06/warren-asks-ftc-to-consider-blocking-dicks-foot-locker-merger.html',
  urlToImage:
    'https://image.cnbcfm.com/api/v1/image/108145953-1747311582289-Untitled-3.jpg?v=1747311595&w=1920&h=1080","publishedAt',
  title:
    "Sen. Warren asks FTC to consider blocking Dick's-Foot Locker merger over antitrust concerns - CNBC",
  description:
    "Sen. Elizabeth Warren asked the FTC and DOJ to consider blocking Dick's Sporting Goods proposed acquisition of Foot Locker over antitrust concerns.",
};

describe('NewsItem component', () => {
  it('render title and description', () => {
    render(<NewsItem {...mockProps} />);

    expect(screen.getByText(mockProps.title)).toBeInTheDocument();
    expect(screen.getByText(mockProps.description)).toBeInTheDocument();
  });

  it('render img', () => {
    render(<NewsItem {...mockProps} />);

    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', mockProps.urlToImage);
    expect(img).toHaveAttribute('alt', mockProps.title);
    expect(img).toHaveClass(classes.news__img);
  });
  it('render links', () => {
    render(<NewsItem {...mockProps} />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', mockProps.url);
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    expect(link).toHaveClass(classes.news__link);
  });
});
