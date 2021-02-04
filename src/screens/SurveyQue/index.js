/* eslint-disable react/jsx-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable react/prop-types */
import React, { useRef } from 'react';
import { SafeAreaView, Text, ScrollView, View, Alert } from 'react-native';
// import { useTheme } from '@react-navigation/native';
import VKCButton from '@components/VKCButton';
import SingleSelectRadio from '@components/SingleSelectRadio';
import MultiSelection from '@components/MultiSelection';
import VKCDraggableList from '@components/VKCDraggableList';
import VKCMediaPicker from '@components/VKCMediaPicker';
// import LongText from '@components/LongText';
import SelectGroup from '@components/SelectGroup';
// import IntegerInput from '@components/IntegerInput';
import SliderQuestion from '@components/SliderQuestion';
import StarRating from '@components/StarRating';
import MultiText from '@components/MultiText';
import { Formik, Field } from 'formik';
import TextInput from '../../components/TextInput/TextInput';
// import TextInput from '@components/TextInput/TextInput';
// import { RectButton } from 'react-native-gesture-handler';
// import SubmitServey from '../../components/SubmitServey';

const SurveyQue = ({ navigation, route }) => {
  // const { colors } = useTheme();
  const { questions, firstQuestion } = route.params;
  const [question, ...restQuestions] = questions;
  const formRef = useRef();

  const onSubmit = values => {
    console.log(values);
    if (restQuestions.length === 0) {
      Alert.alert(
        'Completed',
        'Form Submition Completed',
        [{ text: 'OK', onPress: () => navigation.popToTop() }],
        { cancelable: false },
      );
    } else {
      navigation.push('SurveyQue', {
        questions: restQuestions,
        firstQuestion: false,
      });
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, margin: 10 }}>
      <ScrollView style={{ flex: 1 }}>
        <Formik
          innerRef={formRef}
          initialValues={{
            [question.sQuestion.Id]: '',
            childField: '',
          }}
          onSubmit={onSubmit}>
          {({ values }) => (
            <Choose>
              <When condition={question.sQuestion.Option_Type__c === 'Single Select'}>
                <Field
                  name={question.sQuestion.Id}
                  component={SingleSelectRadio}
                  data={question.Options}
                  value={values[question.sQuestion.Id]}
                  valueField="optionId"
                  textField="optionName"
                  question={question.sQuestion.Detailed_Survey_Question_Name__c}
                  validate={value => {
                    console.log(value);
                    if (!value) {
                      return 'Please Enter Field Value';
                    }
                    return '';
                  }}
                />
              </When>
              <When condition={question.sQuestion.Option_Type__c === 'Single Select List'}>
                <Field
                  name={question.sQuestion.Id}
                  component={SingleSelectRadio}
                  data={question.Options}
                  value={values[question.sQuestion.Id]}
                  valueField="optionId"
                  textField="optionName"
                  question={question.sQuestion.Detailed_Survey_Question_Name__c}
                  validate={value => {
                    console.log(value);
                    if (!value) {
                      return 'Please Enter Field Value';
                    }
                    return '';
                  }}
                />
              </When>
              <When condition={question.sQuestion.Option_Type__c === 'Single Select Group'}>
                <SelectGroup data={question.Options} />
              </When>
              <When condition={question.sQuestion.Option_Type__c === 'Multi Select'}>
                <Field
                  data={question.Options.map(x => ({
                    text: x.optionName,
                    value: x.optionId,
                  }))}
                  component={MultiSelection}
                  name={question.sQuestion.Id}
                  value={values[question.sQuestion.Id]}
                  question={question.sQuestion.Detailed_Survey_Question_Name__c}
                  validate={value => {
                    if (!value || value.length === 0) {
                      return 'Please Enter Field Value';
                    }
                    return '';
                  }}
                />
              </When>
              <When condition={question.sQuestion.Option_Type__c === 'Ordering Question'}>
                <VKCDraggableList data={question.Options} />
              </When>
              <When condition={question.sQuestion.Option_Type__c === 'Integer Enter Question'}>
                <Field
                  component={TextInput}
                  multiline
                  name={question.sQuestion.Id}
                  value={values[question.sQuestion.Id]}
                  question={question.sQuestion.Detailed_Survey_Question_Name__c}
                  validate={value => {
                    if (!value) {
                      return 'Please Enter Field Value';
                    }
                    return '';
                  }}
                />
              </When>
              <When condition={question.sQuestion.Option_Type__c === 'Text'}>
                <Field
                  component={TextInput}
                  multiline
                  name={question.sQuestion.Id}
                  value={values[question.sQuestion.Id]}
                  question={question.sQuestion.Detailed_Survey_Question_Name__c}
                  validate={value => {
                    if (!value) {
                      return 'Please Enter Field Value';
                    }
                    return '';
                  }}
                />
              </When>
              <When condition={question.sQuestion.Option_Type__c === 'Slider'}>
                <SliderQuestion data={question.sQuestion} />
              </When>
              <When condition={question.sQuestion.Option_Type__c === 'Star Rating'}>
                <Field
                  component={StarRating}
                  data={question.sQuestion}
                  name={question.sQuestion.Id}
                  value={values[question.sQuestion.Id]}
                  question={question.sQuestion.Detailed_Survey_Question_Name__c}
                  validate={value => {
                    if (!value) {
                      return 'Please Enter Field Value';
                    }
                    return '';
                  }}
                />
              </When>
              <When
                condition={question.sQuestion.Option_Type__c === 'Question with Image as options'}>
                <Text>{question.sQuestion.Option_Type__c}</Text>
              </When>
              <When
                condition={
                  question.sQuestion.Option_Type__c === 'Upload Image for choosing an Option'
                }>
                <VKCMediaPicker />
              </When>
              <When condition={question.sQuestion.Option_Type__c === 'Multi Text'}>
                <MultiText />
              </When>
              <When condition={question.sQuestion.Option_Type__c === 'Feedback'}>
                <Field
                  component={TextInput}
                  multiline
                  name={question.sQuestion.Id}
                  value={values[question.sQuestion.Id]}
                  question={question.sQuestion.Detailed_Survey_Question_Name__c}
                  validate={value => {
                    if (!value) {
                      return 'Please Enter Field Value';
                    }
                    return '';
                  }}
                />
              </When>
              <When condition={question.sQuestion.Option_Type__c === 'Tabular Question'}>
                <Text>{question.sQuestion.Option_Type__c}</Text>
              </When>
              <When condition={question.sQuestion.Option_Type__c === 'Coupon'}>
                <Text>{question.sQuestion.Option_Type__c}</Text>
              </When>
              <When condition={question.sQuestion.Option_Type__c === 'Display'}>
                <Text>{question.sQuestion.Option_Type__c}</Text>
              </When>
              <When condition={question.sQuestion.Option_Type__c === 'Stock'}>
                <Text>{question.sQuestion.Option_Type__c}</Text>
              </When>
              <When condition={question.sQuestion.Option_Type__c === 'Performance In the Area'}>
                <Text>{question.sQuestion.Option_Type__c}</Text>
              </When>
              <When condition={question.sQuestion.Option_Type__c === 'Salesman Commit'}>
                <Text>{question.sQuestion.Option_Type__c}</Text>
              </When>
              <When condition={question.sQuestion.Option_Type__c === 'Special Efforts'}>
                <Text>{question.sQuestion.Option_Type__c}</Text>
              </When>
              <Otherwise>
                <Text>No Such Question type found</Text>
              </Otherwise>
            </Choose>
          )}
        </Formik>
      </ScrollView>
      <Choose>
        <When condition={firstQuestion}>
          <VKCButton
            variant="fill"
            style={{ marginVertical: 5 }}
            text="Next"
            onPress={() => formRef.current.handleSubmit()}
          />
        </When>
        <Otherwise>
          <View style={{ flexDirection: 'row' }}>
            <VKCButton
              variant="fill"
              style={{ margin: 5, flex: 1 }}
              text="Previous"
              onPress={() => navigation.pop()}
            />
            <VKCButton
              variant="fill"
              style={{ margin: 5, flex: 1 }}
              text={restQuestions.length === 0 ? 'Submit' : 'Next'}
              onPress={() => formRef.current.handleSubmit()}
            />
          </View>
        </Otherwise>
      </Choose>
    </SafeAreaView>
  );

  // return (
  //   <SafeAreaView style={{ flex: 1 }}>
  //     <ScrollView style={{ flex: 1, backgroundColor: colors.primary, padding: 20 }}>
  //       <Choose>
  //         <When condition={data.questionType === 'singleSelectRadio'}>
  //           <SingleSelectRadio data={data} />
  //         </When>
  //         <When condition={data.questionType === 'singleSelectList'}>
  //           <SingleSelectList data={data} />
  //         </When>
  //         <When condition={data.questionType === 'MultiSelect'}>
  //           <MultiSelection data={data} />
  //         </When>
  //         <When condition={data.questionType === 'LongText'}>
  //           <LongText data={data} />
  //         </When>
  //         <When condition={data.questionType === 'integerInput'}>
  //           <IntegerInput data={data} />
  //         </When>
  //         <When condition={data.questionType === 'Slider'}>
  //           <SliderQuestion data={data} />
  //         </When>
  //         <When condition={data.questionType === 'StarRating'}>
  //           <StarRating data={data} />
  //         </When>
  //         <When condition={data.questionType === 'ImageSuggestion'}>
  //           <SingleSelectRadio data={data} />
  //         </When>
  //         <When condition={data.questionType === 'selectGroup'}>
  //           <SelectGroup data={data} />
  //         </When>
  //         <When condition={data.questionType === 'Text'}>
  //           <TextInput data={data} />
  //         </When>
  //         <When condition={data.questionType === 'Feedback'}>
  //           <LongText data={data} />
  //         </When>
  //         <When condition={data.questionType === 'servey'}>
  //           <SubmitServey data={data} />
  //         </When>
  //         <Otherwise>
  //           <Text>ElseBlock</Text>
  //         </Otherwise>
  //       </Choose>
  //     </ScrollView>
  //     <View style={{ backgroundColor: colors.primary }}>
  //       {questionId > 1 ? (
  //         <View style={{ flexDirection: 'row', margin: 20 }}>
  //           <View style={{ flex: 1, marginHorizontal: 5 }}>
  //             <RectButton
  //               style={{
  //                 backgroundColor: 'red',
  //                 justifyContent: 'center',
  //                 alignItems: 'center',
  //                 borderRadius: 20,
  //                 height: 40,
  //               }}
  //               onPress={() =>
  //                 navigation.navigate('SurveyQue', {
  //                   questionId: parseInt(questionId, 10) - 1,
  //                 })
  //               }>
  //               <Text style={{ color: 'white' }}>Prev</Text>
  //             </RectButton>
  //           </View>
  //           <View style={{ flex: 1, marginHorizontal: 5 }}>
  //             <RectButton
  //               style={{
  //                 backgroundColor: 'red',
  //                 justifyContent: 'center',
  //                 alignItems: 'center',
  //                 borderRadius: 20,
  //                 height: 40,
  //               }}
  //               onPress={() =>
  //                 navigation.navigate('SurveyQue', {
  //                   questionId: parseInt(questionId, 10) + 1,
  //                 })
  //               }>
  //               <Text style={{ color: 'white' }}>Next</Text>
  //             </RectButton>
  //           </View>
  //         </View>
  //       ) : (
  //         <View style={{ margin: 20 }}>
  //           <RectButton
  //             style={{
  //               backgroundColor: 'red',
  //               justifyContent: 'center',
  //               alignItems: 'center',
  //               borderRadius: 20,
  //               height: 40,
  //             }}
  //             onPress={() =>
  //               navigation.navigate('SurveyQue', {
  //                 questionId: parseInt(questionId, 10) + 1,
  //               })
  //             }>
  //             <Text style={{ color: 'white' }}>Next</Text>
  //           </RectButton>
  //         </View>
  //       )}
  //     </View>
  //   </SafeAreaView>
  // );
};

export default SurveyQue;
