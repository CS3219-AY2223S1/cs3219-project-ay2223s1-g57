// ref: https://github.com/FirebaseExtended/firepad/issues/383

import React, { useEffect, useState, useRef } from 'react'
import AceEditor from 'react-ace'
import { FIREBASE_CONFIG } from '../../constants/firebase'
import { useAuth } from '../../context/AuthContext'
import ReactAce from 'react-ace/lib/ace'
import firebase from 'firebase'

const Firepad = require('firepad')

type Props = {
  roomId: string
}

export const FirepadComponent = ({ roomId }: Props) => {
  const { currentUsername } = useAuth()
  const editorRef = useRef<ReactAce>(null)

  const getFirebaseRef = () => {
    var ref = firebase.database().ref()
    ref = ref.child(roomId)

    return ref
  }

  useEffect(() => {
    // Initialize Firebase
    if (!firebase.apps.length) {
      firebase.initializeApp(FIREBASE_CONFIG)
    } else {
      firebase.app()
    }

    // Assign AceEditor to Firepad
    if (editorRef) {
      var firepadRef = getFirebaseRef()
      let firepad
      try {
        firepad = Firepad.fromACE(firepadRef, editorRef.current?.editor, {
          userId: currentUsername,
          userColor: '#FFA500',
        })
      } catch (err) {
        console.log(err)
      }
    }
  }, [editorRef])

  return (
    <AceEditor
      ref={editorRef}
      placeholder="Your code goes here....."
      mode="sh"
      theme="clouds"
      name="firepad"
      fontSize={16}
      width={'100%'}
      showPrintMargin={true}
      showGutter={true}
      highlightActiveLine={true}
      style={{ border: '1px solid #e5e5e5' }}
      setOptions={{
        enableBasicAutocompletion: true,
        // enableLiveAutocompletion: true,
        enableSnippets: true,
        showLineNumbers: true,
        tabSize: 4,
      }}
    />
  )
}
