import { icons } from '@/constants/icons'
import { Image, StyleSheet, Text, TextInput, View } from 'react-native'

interface SearchBarProps {
  placeholder: string
  onPress?: () => void
  value?: string
  onChangeText?: (text: string) => void
}

const SearchBar = ({
  onPress,
  placeholder,
  value,
  onChangeText,
}: SearchBarProps) => {
  return (
    <View className="flex-row items-center rounded-full bg-dark-200 px-5 py-4">
      <Image
        source={icons.search}
        className="size-5"
        resizeMode="contain"
        tintColor="#ab8bff"
      />
      <TextInput
        onPress={onPress}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor="#a8b5db"
        className="ml-2 flex-1 text-white"
      />
    </View>
  )
}

export default SearchBar
