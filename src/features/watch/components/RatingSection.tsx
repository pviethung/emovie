import { Tab } from '@/components/Elements';
import { MovieDetail, TvDetail } from '@/services/tmdb';
import clsx from 'clsx';
import { Reviews } from './Reviews';

export const RatingSection = ({
  mediaDetail,
}: {
  mediaDetail: MovieDetail | TvDetail;
}) => {
  return (
    <div className={clsx('bg-base-100 relative px-4')}>
      <Tab
        tabs={[
          {
            id: 'reviews',
            title: <h3 className={clsx('font-bold text-xl mb-4')}>Reviews</h3>,
            content:
              mediaDetail.reviews.results.length > 0 ? (
                <Reviews reviews={mediaDetail.reviews} />
              ) : (
                <p>No reviews yet</p>
              ),
          },
          {
            id: 'comments',
            title: <h3 className={clsx('font-bold text-xl mb-4')}>Comments</h3>,
            content: (
              <p className="h-[280px]">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Voluptas adipisci nobis deserunt veniam, dolor quo. Maiores
                deleniti ullam corporis exercitationem impedit nemo corrupti
                ratione eos! Porro culpa praesentium, dignissimos tempora ab et,
                ea at illum dolore, iure laudantium eius harum eos. Temporibus
                autem necessitatibus hic earum delectus corrupti iusto deserunt
                ea quia maiores architecto voluptatum optio corporis esse, culpa
                enim, sequi unde provident porro? Dignissimos quas explicabo,
                similique laudantium necessitatibus perspiciatis voluptatem
                porro recusandae, corrupti doloribus molestiae accusantium
                impedit quae sapiente, numquam dolorem obcaecati facilis earum
                enim. Atque, quidem facere.
              </p>
            ),
          },
        ]}
      />
    </div>
  );
};
