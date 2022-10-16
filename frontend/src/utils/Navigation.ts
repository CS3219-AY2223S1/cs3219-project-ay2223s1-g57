import { useEffect, useContext } from 'react'
import { NavigationType, UNSAFE_NavigationContext } from 'react-router-dom'
import { History, Update } from 'history'

export const useBackListener = (callback: (...args: any) => void) => {
  const navigator = useContext(UNSAFE_NavigationContext).navigator as History

  useEffect(() => {
    const listener = ({ location, action }: Update) => {
      // Run callback when back-navigation happens
      if (action === NavigationType.Pop) {
        callback({ location, action })
      }
    }

    return navigator.listen(listener)

    // // if something explodes, try this
    // let unlisten
    // try {
    //   unlisten = navigator.listen(listener)
    // } catch (err) {}
    // return unlisten
  }, [callback, navigator])
}
