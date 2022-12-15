import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [result, setResult] = useState();

  async function callAI(prompt) {
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: prompt }),
    });
    const data = await response.json();
    setResult(data.result);
  }

  const prompt1 = "Question 1. Researchers and conservationists stress that biodiversity loss due to invasive species is blank. For example, people can take simple steps such as washing their footwear after travel to avoid introducing potentially invasive organisms into new environments.\
  Which choice completes the text with the most logical and precise word or phrase?\
  A. preventable\
  B. undeniable\
  C. common\
  D. concerning\
  Explanation\
  Choice A is the best answer because it most logically completes the text’s discussion of how biodiversity loss due to invasive species can be avoided. As used in this context, “preventable” means able to be stopped or kept from happening. The text indicates that “people can take simple steps” to avoid bringing possible invasive species into new environments. It presents these steps as an example of how biodiversity loss due to invasive species is preventable.\
  Choice B is incorrect because it wouldn’t make sense to say that a simple step like washing your shoes after traveling is an example of biodiversity loss due to invasive species being undeniable, or something that can’t be proved to be wrong. Although the text may suggest that biodiversity loss due to invasive species is something that really happens, the word that completes the text must make the first sentence into an assertion that is illustrated by the second sentence, and the second sentence illustrates the idea that biodiversity loss due to invasive species is preventable, not undeniable.\
  Choice C is incorrect because it wouldn’t make sense to say that a simple step like washing your shoes after traveling is an example of biodiversity loss due to invasive species being common,or something that happens regularly. Additionally, the text doesn’t provide any information about how frequently invasive species cause biodiversity loss.\
  Choice D is incorrect because it wouldn’t make sense to say that a simple step like washing your shoes after traveling is an example of biodiversity loss due to invasive species being “concerning,” or something that is troubling or causes worry. Although the text implies that the phenomenon of biodiversity loss due to invasive species is itself a concerning phenomenon, the word that completes the text must make the first sentence into an assertion that is illustrated by the second sentence, and the second sentence illustrates the idea that biodiversity loss due to invasive species is preventable, not concerning.\
  \n###\
  \Question 2.\
  It is by no means blank.\
  to recognize the influence of Dutch painter Hieronymus Bosch on Ali Banisadr’s paintings; indeed, Banisadr himself cites Bosch as an inspiration. However, some scholars have suggested that the ancient Mesopotamian poem Epic of Gilgameshmay have had a far greater impact on Banisadr’s work.\
  Which choice completes the text with the most logical and precise word or phrase?\
  A.substantial\
  B.satisfying\
  C.unimportant\
  D.appropriate\
  Explanation\
  Choice C is the best answer because it most logically completes the text’s discussion of the influences on Banisadr’s work. As used in this context, “unimportant” means trivial or lacking value. “It is by no means” establishes that the word that goes in the blank is contradicted by other information; the material that follows “indeed” later in that sentence provides the contradicting information—namely, that Banisadr himself cites Bosch as an inspiration. In other words, the sentence indicates that Bosch’s influence on Banisadr is significant, and thus recognizing that influence is by no means unimportant.\
  Choice A is incorrect because it wouldn’t make sense to say that recognizing Bosch’s influence on Banisadr isn’t “substantial,” or meaningful. The text states that Banisadr himself cites Bosch as an influence. Choice B is incorrect because it wouldn’t make sense to say that it isn’t “satisfying,” or pleasing, to recognize Bosch’s influence on Banisadr. The text states that Banisadr himself cites Bosch as an influence. Choice D is incorrect because it wouldn’t make sense to say that recognizing Bosch’s influence on Banisadr isn’t “appropriate,” or suitable. The text indicates that Banisadr himself notes that Bosch’s work has had an effect on him\
  \n###\
  \Question 3.\
  Due to their often strange images, highly experimental syntax, and opaque subject matter, many of John Ashbery’s poems can be quite difficult to blank\
  and thus are the object of heated debate among scholars.\
  Which choice completes the text with the most logical and precise word or phrase?\
  A.delegate\
  B.compose\
  C.interpret\
  D.renounce\
  Explanation\
  Choice C is the best answer because it most logically completes the text’s discussion of John Ashbery’s poems. As used in this context, “interpret” would mean decipher the meaning of. The text indicates that Ashbery’s poems have many unusual features, that it’s difficult to tell what exactly the poems’ subject matter is, and that scholars strongly disagree about the poems. This context conveys the idea that it’s difficult to interpret Ashbery’s poems.\
  Choice A is incorrect because “delegate” means to assign someone as a representative of another person or to entrust something to someone else, neither of which would make sense in context. The text is focused only on the difficulty that readers have interpreting Ashbery’s poems due to their many unusual features; it doesn’t suggest anything about the poems being difficult to delegate. Choice B is incorrect because describing Ashbery’s poems as difficult to “compose,” or put together or produce, would make sense only if the text were about Ashbery’s experience of writing the poems. It could be true that it was difficult for Ashbery to compose his poems, but the text doesn’t address this; it instead discusses how readers interpret and engage with the poems. Choice D is incorrect because describing Ashbery’s poems as being difficult to “renounce,” or give up or refuse, wouldn’t make sense in context. The text focuses on the idea that features of Ashbery’s poems are odd or unclear and have caused heated scholarly debate. This context suggests that the poems are difficult to interpret, not that the poems are difficult to renounce.\
  \n###\
 \Question 4. Mônica Lopes-Ferreira and others at Brazil’s Butantan Institute are studying the freshwater stingray species Potamotrygon rex to determine whether biological characteristics such as the rays’ age and sex have blank\
 effect on the toxicity of their venom—that is, to see if differences in these traits are associated with considerable variations in venom potency.\
Which choice completes the text with the most logical and precise word or phrase?\
A.a disconcerting\
B.an acceptable\
C.an imperceptible\
D.a substantial\
Explanation\
Choice D is the best answer because it most logically completes the text’s discussion of the research that Lopes-Ferreira and her colleagues are conducting on the stingray species Potamotrygon rex. As used in this context, “a substantial” effect means an effect that is sizable or noteworthy. The text indicates that the researchers are seeking to determine whether there are “considerable variations” in the potency of stingray venom that are associated with variation in the stingrays’ age and sex. This context suggests that the researchers want to find out whether stingray age and sex have a substantial effect on venom toxicity.\
Choice A is incorrect because there’s nothing in the text that suggests that the researchers have been studying whether the stingrays’ age and sex have “a disconcerting,” or an unsettling and disturbing, effect on the stingrays’ venom. The text indicates that the researchers wish to determine if stingray age and sex cause large variations in the toxicity of stingray venom, not if the effect of age and sex is disconcerting. Choice B is incorrect because the text indicates that researchers want to find out whether differences in stingray age and sex produce differences in stingray venom, not that the researchers want to find out whether age and sex have “an acceptable,” or a satisfactory, effect on venom. The text makes no mention of what would make an effect on venom toxicity acceptable and gives no indication that the researchers are interested in that question. Choice C is incorrect because it wouldn’t make sense in context for the researchers to be looking for “an imperceptible,” or an unnoticeable, effect of age and sex on stingray venom. The text says that the researchers are trying to determine if there are “considerable variations” in venom toxicity linked to age and sex, not that the researchers are trying to find effects that they can’t perceive.\
\n###\
  \Question 5. Former astronaut Ellen Ochoa says that although she doesn’t have a definite idea of when it might happen, she blank\
  that humans will someday need to be able to live in other environments than those found on Earth. This conjecture informs her interest in future research missions to the moon.\
 Which choice completes the text with the most logical and precise word or phrase?\
 A.demands\
 B.speculates\
 C.doubts\
 D.establishes\
 Explanation\
 Choice B is the best answer because it most logically completes the text’s discussion of Ochoa’s prediction that humans will one day need to live in places other than Earth. As used in this context, “speculates” would mean puts forward an idea without firm evidence. The text states that Ochoa “doesn’t have a definite idea” about when humans might need to live in other environments and characterizes Ochoa’s prediction as a “conjecture,” or a conclusion presented without convincing evidence. This context indicates that Ochoa speculates when she makes this prediction. \
 Choice A is incorrect because saying that Ochoa “demands,” or insists or requires, that humans will one day need to live in other environments than Earth’s wouldn’t make sense in context. The text indicates that she’s unsure about the timing but hypothesizes that it will someday happen. Choice C is incorrect because  saying that Ochoa “doubts,” or questions or disbelieves, that humans will one day need to live in other environments than Earth’s wouldn’t make sense in context. The text indicates that although Ochoa is unsure about the timing, she hypothesizes that humans will need to live in places other than Earth and encourages research into future travel to the moon. Choice D is incorrect because saying that Ochoa “establishes,” or proves, that humans will one day need to live in other environments than Earth’s wouldn’t make sense in context. Rather than stating that Ochoa discusses her idea with certainty and supports it with evidence, the text indicates that Ochoa is unsure about when humans might need to live in other environments.\
 \n###\
 \Question 6. Following the principles of community-based participatory research, tribal nations and research institutions are equal partners in health studies conducted on reservations. A collaboration between the Crow Tribe and Montana State University blank\
 this model: tribal citizens worked alongside scientists to design the methodology and continue to assist in data collection.\
 Which choice completes the text with the most logical and precise word or phrase?\
 A.circumvents\
 B.eclipses\
 C.fabricates\
 D.exemplifies\
 Explanation\
 Choice D is the best answer because it most logically completes the text’s discussion of the collaboration between the Crow Tribe and Montana State University. As used in this context, “exemplifies” means demonstrates. The text conveys how the Crow Tribe–Montana State University collaboration serves to illustrate the model of community-based participatory research introduced earlier in the text and expanded on later in the text.\
 Choice A is incorrect because referring to “circumvents,” or avoids, wouldn’t make sense in context. The text suggests that the Crow Tribe–Montana State University collaboration serves as an example of the principles of community-based participatory research, not that the collaboration evades this model. Choice C is incorrect because saying that the collaboration “fabricates,” or creates, the model wouldn’t make sense in context. The text indicates that the Crow Tribe–Montana State University collaboration serves as an example of the model, not that it created the model. Choice B is incorrect because referring to “eclipses,” or overshadows, wouldn’t make sense in context. The text describes the Crow Tribe–Montana State University collaboration as an equal partnership, which indicates that it’s an example of the community-based participatory research model, not that it overshadows the model.\
 \n###\, "
  const prompt1Name = "Words in Context Format"

  const prompt2 = "List out 5 intricate, complelling details on how and why we are likely living in a simulation.\n###\n1.\n\n\n"
  const prompt2Name = "5 Reasons were likely in a simulation"

  const prompt3 = "list out five of the utmot amazing and astonishing but little known facts.\n###\n1.\n\n\n"
  const prompt3Name = "Surprise Me"

  return (
    <div>
      <Head>
        <title>Prompt</title>
      </Head>

      <main className={styles.main}>
        <button type="button" onClick={() => callAI(prompt1)}>{prompt1Name}</button>
        <button type="button" onClick={() => callAI(prompt2)}>{prompt2Name}</button>
        <button type="button" onClick={() => callAI(prompt3)}>{prompt3Name}</button>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}
