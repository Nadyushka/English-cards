import React, { ChangeEvent, useState } from 'react'

import updatePack from 'common/assets/pictures/changePack.svg'
import { ButtonComponent } from 'common/components/button/ButtonComponent'
import s from 'features/modals/addUpdatePackModal/AddUpdatePackModal.module.css'
import { BasicModal } from 'features/modals/BasicModal'
import { BasicSelect } from 'features/modals/commonComponents/basicSelect/BasicSelect'
import { InputComponent } from 'features/modals/commonComponents/input/InputComponent'
import { Title } from 'features/modals/commonComponents/title/Title'
import { UploadButton } from 'features/modals/commonComponents/uploadButton/uploadButton'

type PropsType = {
  type: 'add' | 'update'
  cardQuestion: string
  cardAnswer: string
  callBack: (question: string, answer: string, questionImg: string) => void
  questionFormatValue: QuestionFormatType
  questionImg: string
}
export type QuestionFormatType = 'text' | 'picture'

const cancelButtonStyle = {
  backgroundColor: '#FCFCFC',
  color: 'black',
}
const saveButtonStyle = {
  backgroundColor: '#366EFF',
}

export const AddUpdateCardModal = ({
  type,
  cardQuestion,
  cardAnswer,
  callBack,
  questionFormatValue,
  questionImg,
}: PropsType) => {
  const [questionFormat, setQuestionFormat] = useState<QuestionFormatType>(questionFormatValue!)
  const [question, setQuestion] = useState(cardQuestion)
  const [imageQuestion, setImageQuestion] = useState(questionImg)
  const [answer, setAnswer] = useState(cardAnswer)

  const onChangeQuestionHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.currentTarget.value.trim())
  }
  const onChangeAnswerHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setAnswer(e.currentTarget.value.trim())
  }

  return (
    <BasicModal
      childrenButton={handleOpen =>
        type === 'update' ? (
          <img src={updatePack} alt={'icon'} onClick={() => handleOpen()} />
        ) : (
          <ButtonComponent name={'Add new card'} callBack={() => handleOpen()} />
        )
      }
    >
      {handleClose => (
        <>
          <Title
            condition={type === 'update'}
            firstTitle={'Edit card'}
            secondTitle={'Add new card'}
          />
          <BasicSelect questionFormat={questionFormat} setQuestionFormat={setQuestionFormat} />
          <div className={s.contentBox}>
            {questionFormat === 'text' ? (
              <InputComponent
                name={'question'}
                value={question}
                onChange={onChangeQuestionHandler}
                autoFocus={true}
                labelName={'Question'}
              />
            ) : (
              (!imageQuestion && (
                <div className={s.uploadImageButton}>
                  <span>Upload your question</span>
                  <UploadButton setImage={setImageQuestion} />
                </div>
              )) ||
              (imageQuestion && (
                <div className={s.uploadedImageBox}>
                  <img src={imageQuestion} alt="" className={s.uploadedImageQuestion} />
                  <UploadButton setImage={setImageQuestion} />
                </div>
              ))
            )}

            <InputComponent
              name={'answer'}
              value={answer}
              onChange={onChangeAnswerHandler}
              autoFocus={false}
              labelName={'Answer'}
            />

            <div className={s.buttonBox}>
              <ButtonComponent
                name={'Cancel'}
                callBack={() => {
                  handleClose()
                  if (type === 'add') setImageQuestion('')
                }}
                style={cancelButtonStyle}
              />
              <ButtonComponent
                name={'Save'}
                callBack={() => {
                  if (type === 'update') {
                    callBack(question, answer, imageQuestion)
                    handleClose()
                  } else {
                    callBack(question, answer, imageQuestion)
                    handleClose()
                    setQuestion('')
                    setAnswer('')
                    setImageQuestion('')
                  }
                }}
                style={saveButtonStyle}
                disabled={answer === '' && (question === '' || imageQuestion === '')}
              />
            </div>
          </div>
        </>
      )}
    </BasicModal>
  )
}
