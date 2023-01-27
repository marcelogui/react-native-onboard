import React, { FC } from 'react'
import { KeyboardAvoidingView, ScrollView, StyleSheet, View } from 'react-native'
import { HORIZONTAL_PADDING_DEFAULT } from '../../constants'
import { OnboardPageConfigParams } from '../../index'
import { FormEntryField, InputField } from '../../components/InputField'
import { TextStack } from '../../components/TextStack'

export interface FormEntryPageProps {
  fields: FormEntryField[]
}

export const FormEntryPage: FC<OnboardPageConfigParams<FormEntryPageProps>> = ({
  style,
  titleStyle,
  subtitleStyle,
  textStyle,
  pageData,
  formElementTypes,
  currentPage,
  totalPages,
  goToNextPage,
  goToPreviousPage,
  onSaveData,
  textAlign,
  width,
  primaryColor,
  secondaryColor,
  props,
}) => {
  return (
    <View
      style={[
        styles.container,
        {
          width: width,
          paddingHorizontal: HORIZONTAL_PADDING_DEFAULT,
        },
        style,
      ]}
    >
      <KeyboardAvoidingView>
        <TextStack
          title={pageData?.title}
          subtitle={pageData?.subtitle}
          textStyle={textStyle}
          textAlign={textAlign}
          titleStyle={titleStyle}
          subtitleStyle={subtitleStyle}
        />
        <ScrollView>
          {props.fields.map((input, index) => (
            <View key={index}>
              {input.type && formElementTypes[input.type] ? (
                formElementTypes[input.type]({
                  onSetText: (text: string) => {
                    if (onSaveData) {
                      onSaveData({
                        source: pageData,
                        data: {
                          id: input.id,
                          value: text,
                        },
                      })
                    }
                    if (input.onSetText) {
                      input.onSetText(text)
                    }
                  },
                  label: input.label,
                  placeHolder: input.placeHolder,
                  type: input.type,
                  getErrorMessage: input.getErrorMessage,
                  isRequired: input.isRequired,
                  prefill: input.prefill,
                  id: input.id,
                  primaryColor: primaryColor,
                  secondaryColor: secondaryColor,
                  props: input.props,
                })
              ) : (
                <InputField
                  onSetText={(text: string) => {
                    if (onSaveData) {
                      onSaveData({
                        source: pageData,
                        data: {
                          id: input.id,
                          value: text,
                        },
                      })
                    }
                    if (input.onSetText) {
                      input.onSetText(text)
                    }
                  }}
                  primaryColor={primaryColor}
                  secondaryColor={secondaryColor}
                  textStyle={textStyle}
                  {...input}
                />
              )}
            </View>
          ))}
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
})
