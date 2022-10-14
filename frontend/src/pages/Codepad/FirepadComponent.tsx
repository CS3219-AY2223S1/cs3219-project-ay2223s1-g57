// ref: https://github.com/FirebaseExtended/firepad/issues/383

import React, { useEffect, useState, useRef } from 'react'
import firebase from 'firebase'
import AceEditor from 'react-ace'
import { FIREBASE_CONFIG } from '../../constants/firebase'

declare global {
  var ace: any
  interface Window {
    Firepad: any
  }
}

type Props = {
  roomId: string
}

export const FirepadComponent = ({ roomId }: Props) => {
  const editorRef = useRef<HTMLDivElement>(null)
  const [code, setCode] = useState<string>('')

  const getExampleRef = () => {
    var ref = firebase.database().ref()
    ref = ref.child(roomId)

    console.log('Firebase data: ', ref.toString())
    console.log(ref)

    return ref
  }

  useEffect(() => {
    // Initialize Firebase
    if (!firebase.apps.length) {
      firebase.initializeApp(FIREBASE_CONFIG)
    } else {
      firebase.app()
    }

    var firepadRef = getExampleRef()
    const Firepad = require('firepad')
    let firepad
    try {
      firepad = Firepad.fromACE(firepadRef, editorRef, {
        userId: 'user_1',
        userColor: '#FFA500',
      })
    } catch (err) {
      console.log(err)
    }

    // if (firepad) {
    //   console.log('firepad')
    //   firepad.on('ready', () => {
    //     console.log('firepad ready')
    //   })

    //   firepad.on('synced', (isSynced: boolean) => {
    //     console.log('firepad synced')
    //   })
    // }
  }, [])

  const setTextInEditor = (newValue: string) => {
    setCode(newValue)
  }

  return (
    <div ref={editorRef}>
      <AceEditor
        placeholder="Your code goes here....."
        mode="sh"
        theme="chrome"
        name="firepad"
        // onLoad={() => getStartingCode(currentLanguage)}
        onChange={(newValue) => setTextInEditor(newValue)}
        fontSize={16}
        width={'100%'}
        showPrintMargin={true}
        showGutter={true}
        highlightActiveLine={true}
        value={code}
        style={{ border: '1px solid #e5e5e5' }}
        setOptions={{
          enableBasicAutocompletion: true,
          // enableLiveAutocompletion: true,
          enableSnippets: true,
          showLineNumbers: true,
          tabSize: 4,
        }}
      />
    </div>
  )
}

// // ref: https://stackoverflow.com/questions/43768019/react-js-firebase-and-firepad-component

// import React, { useRef, useEffect } from 'react'
// import { FIREBASE_CONFIG } from '../../constants/firebase'
// import firebase from 'firebase'
// import CodeMirror from 'codemirror'
// import 'codemirror/lib/codemirror.css'

// // https://stackoverflow.com/questions/56457935/typescript-error-property-x-does-not-exist-on-type-window
// declare global {
//   interface Window {
//     CodeMirror: any
//   }
// }

// export const FirepadComponent = () => {
//   const editorRef = useRef<HTMLDivElement>(null)

//   useEffect(() => {
//     if (!firebase.apps.length) {
//       firebase.initializeApp(FIREBASE_CONFIG)
//     } else {
//       firebase.app()
//     }

//     const codeMirror = CodeMirror(editorRef.current! as ParentNode)
//     window.CodeMirror = CodeMirror
//     const Firepad = require('firepad')
//     const firepadRef = firebase.database().ref()
//     Firepad.fromCodeMirror(firepadRef, codeMirror)
//   }, [])

//   return <div id="codemirror" ref={editorRef}></div>
// }
