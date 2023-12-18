import React, { useContext } from "react";
import {
  Box,
  FormControl,
  Input,
  InputLabel,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { formContext } from "../../context/FormContext";
export const WordForm = () => {
  const useForm = useContext(formContext);
  return (
    <>
      <Box
        width={"100%"}
        height={"70%"}
        display={"flex"}
        gap={10}
        overflow={"auto"}
      >
        {/* Left Side Form */}
        <Box
          width={"50%"}
          height={"100%"}
          display={"flex"}
          alignItems={"flex-start"}
          justifyContent={"flex-end"}
        >
          <FormControl
            sx={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            <TextField
              sx={{ marginTop: "10px" }}
              size="small"
              label="Word in English"
              onChange={(e) =>
                useForm.setWord({ ...useForm.word, english: {...useForm.word.english,word:e.target.value} })
              }
            />
            {/* <TextField
              size="small"
              label="Singular Indefinite"
              onChange={(e) =>
                useForm.setWord({
                  ...useForm.word,
                  singularIndefinite: e.target.value,
                })
              }
            /> */}
            <FormControl sx={{ width: "100%", marginTop: "30px" }}>
              <Box
                width={"100%"}
                display={"flex"}
                flexDirection={"column"}
                gap={4}
              >
                <InputLabel id="type">Parts of Speech</InputLabel>
                <Select
                  labelId="type"
                  id="demo-simple-select"
                  value={useForm.speech.english}
                  label="Parts of Speech"
                  onChange={(e) =>{
                    useForm.setSpeech({
                      ...useForm.speech,
                      english: e.target.value,
                    })
                    useForm.setWord({ ...useForm.word, english: {...useForm.word.english,parts_of_speech:e.target.value} })
                  }}
                  size="small"
                >
                  <MenuItem value={"noun"}>Noun</MenuItem>
                  <MenuItem value={"prnoun"}>Pronoun</MenuItem>
                  <MenuItem value={"verb"}>Verb </MenuItem>
                </Select>
              </Box>
            </FormControl>
            {/* <TextField
              size="small"
              label="Singular Definite"
              onChange={(e) =>
                useForm.setWord({
                  ...useForm.word,
                  singularDefinite: e.target.value,
                })
              }
            /> */}
            <TextField
              size="small"
              label="Definition"
              onChange={(e) =>
                useForm.setWord({ ...useForm.word, english: {...useForm.word.english,definition:e.target.value} })

              }
            />
            <TextField
              size="small"
              label="Sentence"
              onChange={(e) =>
                useForm.setWord({ ...useForm.word, english: {...useForm.word.english,sentence:e.target.value} })

              }
            />

            {/* Verbs */}
            {useForm.speech.english == "verb" && (
              <>
              <TextField
                size="small"
                label="Present Simple"
                onChange={(e) =>
                  useForm.setWord({ ...useForm.word, english: {...useForm.word.english,present_simple:e.target.value} })

                }
              />
              <TextField
                size="small"
                label="Present Continuous"
                onChange={(e) =>
                  useForm.setWord({ ...useForm.word, english: {...useForm.word.english,present_continuous:e.target.value} })

                }
              />
              <TextField
                size="small"
                label="Present Perfect:"
                onChange={(e) =>
                  useForm.setWord({ ...useForm.word, english: {...useForm.word.english,present_perfect:e.target.value} })

                }
              />
              <TextField
                size="small"
                label="Present Perfect Continuous"
                onChange={(e) =>
                  useForm.setWord({ ...useForm.word, english: {...useForm.word.english,present_perfect_continuous:e.target.value} })

                }
              />
              <TextField
                size="small"
                label="Past Simple"
                onChange={(e) =>
                  useForm.setWord({ ...useForm.word, english: {...useForm.word.english,past_simple:e.target.value} })

                }
              />
              <TextField
                size="small"
                label="Past Continuous"
                onChange={(e) =>
                  useForm.setWord({ ...useForm.word, english: {...useForm.word.english,past_continuous:e.target.value} })

                }
              />
              <TextField
                size="small"
                label="Past Perfect"
                onChange={(e) =>
                  useForm.setWord({ ...useForm.word, english: {...useForm.word.english,past_perfect:e.target.value} })

                }
              />
              <TextField
                size="small"
                label="Past Perfect Continuous"
                onChange={(e) =>
                  useForm.setWord({ ...useForm.word, english: {...useForm.word.english,past_perfect_continuous:e.target.value} })

                }
              />
              <TextField
                size="small"
                label="Future Simple"
                onChange={(e) =>
                  useForm.setWord({ ...useForm.word, english: {...useForm.word.english,future_simple:e.target.value} })

                }
              />
              <TextField
                size="small"
                label="Future Continuous"
                onChange={(e) =>
                  useForm.setWord({ ...useForm.word, english: {...useForm.word.english,future_continuous:e.target.value} })

                }
              />
              <TextField
                size="small"
                label="Future Perfect"
                onChange={(e) =>
                  useForm.setWord({ ...useForm.word, english: {...useForm.word.english,future_perfect:e.target.value} })

                }
              />
              <TextField
                size="small"
                label="Future Perfect Continuous"
                onChange={(e) =>
                  useForm.setWord({ ...useForm.word, english: {...useForm.word.english,future_perfect_continuous:e.target.value} })

                }
              />
              </>
            )}

            {/*             
            <TextField
              size="small"
              label="Plural Indefinite"
              onChange={(e) =>
                useForm.setWord({
                  ...useForm.word,
                  pluralIndefinite: e.target.value,
                })
              }
            />
            <TextField
              size="small"
              label="Plural Definite"
              onChange={(e) =>
                useForm.setWord({
                  ...useForm.word,
                  singularDefinite: e.target.value,
                })
              }
            />
            <TextField
              size="small"
              label="V1"
              onChange={(e) =>
                useForm.setWord({ ...useForm.word, V1: e.target.value })
              }
            />
            <TextField
              size="small"
              label="V2"
              onChange={(e) =>
                useForm.setWord({ ...useForm.word, V2: e.target.value })
              }
            /> */}
          </FormControl>
        </Box>
        {/* right side form */}
        <Box width={"50%"} height={"100%"}>
          <Box
            width={"60%"}
            height={"100%"}
            display={"flex"}
            alignItems={"flex-start"}
            justifyContent={"flex-start"}
          >
            <FormControl
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              }}
            >
              <TextField
                sx={{ marginTop: "10px" }}
                size="small"
                label="Word in Norwegian"
                onChange={(e) =>
                  useForm.setWord({ ...useForm.word, norwegian: {...useForm.word.norwegian,word:e.target.value} })

                }
                fullWidth
              />
              {/* <TextField
                size="small"
                label="V3"
                onChange={(e) =>
                  useForm.setWord({ ...useForm.word, V3: e.target.value })
                }
              /> */}
              <FormControl sx={{ width: "100%", marginTop: "30px" }}>
                <Box
                  width={"100%"}
                  display={"flex"}
                  flexDirection={"column"}
                  gap={4}
                >
                  <InputLabel id="type">Parts of Speech</InputLabel>
                  <Select
                    labelId="type"
                    id="demo-simple-select"
                    value={useForm.speech.norwegian}
                    label="Parts of Speech"
                    onChange={(e) =>{
                      useForm.setSpeech({
                        ...useForm.speech,
                        norwegian: e.target.value,
                      })
                    useForm.setWord({ ...useForm.word, norwegian: {...useForm.word.norwegian,parts_of_speech:e.target.value} })

                    }}
                    size="small"
                  >
                    <MenuItem value={"noun"}>Noun</MenuItem>
                    <MenuItem value={"prnoun"}>Pronoun</MenuItem>
                    <MenuItem value={"verb"}>Verb </MenuItem>
                  </Select>
                </Box>
              </FormControl>
              {/* <TextField
                size="small"
                label="V4"
                onChange={(e) =>
                  useForm.setWord({ ...useForm.word, V4: e.target.value })
                }
              /> */}
              <TextField
                size="small"
                label="Definiton"
                onChange={(e) =>
                  useForm.setWord({ ...useForm.word, norwegian: {...useForm.word.norwegian,definition:e.target.value} })

                }
              />
              <TextField
                size="small"
                label="Sentence"
                onChange={(e) =>
                  useForm.setWord({ ...useForm.word, norwegian: {...useForm.word.norwegian,sentence:e.target.value} })

                }
              />
              
                {/* Verb */}
                {useForm.speech.norwegian == "verb" && (
              <>
              <TextField
                size="small"
                label="Present Simple"
                onChange={(e) =>
                  useForm.setWord({ ...useForm.word, norwegian: {...useForm.word.norwegian,present_simple:e.target.value} })

                }
              />
              <TextField
                size="small"
                label="Present Continuous"
                onChange={(e) =>
                  useForm.setWord({ ...useForm.word, norwegian: {...useForm.word.norwegian,present_continuous:e.target.value} })

                }
              />
              <TextField
                size="small"
                label="Present Perfect:"
                onChange={(e) =>
                  useForm.setWord({ ...useForm.word, norwegian: {...useForm.word.norwegian,present_perfect:e.target.value} })

                }
              />
              <TextField
                size="small"
                label="Present Perfect Continuous"
                onChange={(e) =>
                  useForm.setWord({ ...useForm.word, norwegian: {...useForm.word.norwegian,present_perfect_continuous:e.target.value} })

                }
              />
              <TextField
                size="small"
                label="Past Simple"
                onChange={(e) =>
                  useForm.setWord({ ...useForm.word, norwegian: {...useForm.word.norwegian,past_simple:e.target.value} })

                }
              />
              <TextField
                size="small"
                label="Past Continuous"
                onChange={(e) =>
                  useForm.setWord({ ...useForm.word, norwegian: {...useForm.word.norwegian,past_continuous:e.target.value} })

                }
              />
              <TextField
                size="small"
                label="Past Perfect"
                onChange={(e) =>
                  useForm.setWord({ ...useForm.word, norwegian: {...useForm.word.norwegian,past_perfect:e.target.value} })

                }
              />
              <TextField
                size="small"
                label="Past Perfect Continuous"
                onChange={(e) =>
                  useForm.setWord({ ...useForm.word, norwegian: {...useForm.word.norwegian,past_perfect_continuous:e.target.value} })

                }
              />
              <TextField
                size="small"
                label="Future Simple"
                onChange={(e) =>
                  useForm.setWord({ ...useForm.word, norwegian: {...useForm.word.norwegian,future_simple:e.target.value} })

                }
              />
              <TextField
                size="small"
                label="Future Continuous"
                onChange={(e) =>
                  useForm.setWord({ ...useForm.word, norwegian: {...useForm.word.norwegian,future_continuous:e.target.value} })

                }
              />
              <TextField
                size="small"
                label="Future Perfect"
                onChange={(e) =>
                  useForm.setWord({ ...useForm.word, norwegian: {...useForm.word.norwegian,future_perfect:e.target.value} })

                }
              />
              <TextField
                size="small"
                label="Future Perfect Continuous"
                onChange={(e) =>
                  useForm.setWord({ ...useForm.word, norwegian: {...useForm.word.norwegian,future_perfect_continuous:e.target.value} })

                }
              />
              </>
            )}

              {/* <TextField
                size="small"
                label="Adverb"
                onChange={(e) =>
                  useForm.setWord({ ...useForm.word, adverb: e.target.value })
                }
              />
              <TextField
                size="small"
                label="Pronouns"
                onChange={(e) =>
                  useForm.setWord({ ...useForm.word, pronouns: e.target.value })
                }
              /> */}
            </FormControl>
          </Box>
        </Box>
      </Box>
    </>
  );
};
