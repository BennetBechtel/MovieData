import { Link } from 'expo-router'
import MaskedView from '@react-native-masked-view/masked-view'
import { View, Text, TouchableOpacity, Image } from 'react-native'

import { images } from '@/constants/images'

const TrendingCard = ({
  movie: { movie_id, title, poster_path },
  index,
}: TrendingCardProps) => {
  return (
    <Link href={`/movies/${movie_id}`} asChild>
      <TouchableOpacity className="relative w-32 pl-5">
        <Image
          source={{
            uri: poster_path
              ? `https://image.tmdb.org/t/p/w500/${poster_path}`
              : 'https://placehold.co/600x400/1a1a1a/ffffff.png',
          }}
          className="h-48 w-32 rounded-lg"
          resizeMode="cover"
        />

        <View className="absolute -left-3.5 bottom-9 rounded-full px-2 py-1">
          <MaskedView
            maskElement={
              <Text className="text-6xl font-bold text-white">{index + 1}</Text>
            }
          >
            <Image
              source={images.rankingGradient}
              className="size-14"
              resizeMode="cover"
            />
          </MaskedView>
        </View>

        <Text
          className="mt-2 text-sm font-bold text-light-200"
          numberOfLines={2}
        >
          {title}
        </Text>
      </TouchableOpacity>
    </Link>
  )
}

export default TrendingCard
