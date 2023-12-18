const {openai} = require("../gpt_connection/connect")


const generatePrompt = async (req, res) => {
  try {
    const {prompt} = req.body
    console.log("workkk")
    // const completion = await openai.completions.create({
    //     model: 'gpt-3.5-turbo-instruct',
    //     prompt: `${prompt}`
    // });
    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: `${prompt}` }],
      model: "gpt-3.5-turbo",
      // model: "gpt-3.5-turbo-16k ",
    });
    console.log("working",completion.choices[0].message.content)
    return res.send({
        status:200,
        completion
    })
  } catch (error) {
    return res.send({
        message:error.message
    })
  }
};


module.exports={generatePrompt}
