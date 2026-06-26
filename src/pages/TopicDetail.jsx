import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, BookOpen, Users, HelpCircle, 
  ChevronDown, ArrowLeft, MessageSquare, PhoneCall 
} from 'lucide-react';
import PageTransition from '../components/PageTransition';

// FAQ Accordion Item Component
function AccordionItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-white/5 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left py-5 px-4 flex items-center justify-between group transition-all duration-300 hover:border-l-4 hover:border-l-[#7C3AED] hover:bg-white/[0.02] border-l-4 border-l-transparent cursor-pointer"
      >
        <span className="font-display font-medium text-sm sm:text-base md:text-lg text-[#F9F5FF] pr-4">
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="text-[#C4B5FD] group-hover:text-[#7C3AED] shrink-0"
        >
          <ChevronDown size={18} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pt-2 text-xs sm:text-sm md:text-base text-[#C4B5FD] leading-relaxed border-l-4 border-l-[#7C3AED]/40 bg-white/[0.01]">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Topic Data Store
const topicData = {
  "domestic-violence": {
    title: "Domestic Violence Protection",
    icon: <Shield size={36} className="text-[#F472B6]" />,
    intro: "The Protection of Women from Domestic Violence Act, 2005 (DV Act) provides civil remedies and protection against physical, emotional, sexual, and financial abuse inside the home.",
    faqs: [
      {
        question: "What qualifies as domestic violence under the DV Act?",
        answer: "Domestic violence includes physical assault, sexual abuse, emotional or verbal harassment (calling names, insults, threats of violence), and economic abuse (restricting money, denying shelter, taking away joint property or jewellery)."
      },
      {
        question: "Who is eligible to file a complaint under this law?",
        answer: "Any woman who has lived or is currently living in a shared household with the abuser, and who has a domestic relationship with them (marriage, blood relationship, adoption, or live-in partnership) can file a complaint."
      },
      {
        question: "What is a Protection Order?",
        answer: "It is an order passed by a magistrate that legally prohibits the abuser from committing or aiding any act of domestic violence, entering the victim's workplace or residence, or contacting the victim."
      },
      {
        question: "Can I be thrown out of the house by my husband or in-laws?",
        answer: "No. The DV Act provides a 'Right to Reside' in the shared household. A magistrate can issue a 'Residence Order' stopping the husband or in-laws from evicting you, regardless of whether you have ownership rights in the house."
      },
      {
        question: "What is a Protection Officer and how do I contact one?",
        answer: "Protection Officers are government-appointed officers under the DV Act. Their duty is to assist victims in filing Domestic Incident Reports, securing medical aid, getting legal advice, and approaching courts."
      },
      {
        question: "Can I get monetary support immediately?",
        answer: "Yes. The magistrate can pass monetary relief orders directing the respondent to pay maintenance to meet your expenses, including medical bills, loss of earnings, and school fees for children."
      },
      {
        question: "What is the penalty for violating a Protection Order?",
        answer: "If the abuser breaches a protection order passed by the magistrate, it is a cognisable and non-bailable criminal offense punishable by up to 1 year of imprisonment, a fine of ₹20,000, or both."
      },
      {
        question: "Is there a time limit (limitation period) for filing a domestic violence case?",
        answer: "No. The Supreme Court of India has ruled that there is no limitation period or time limit for a woman to approach the court under the Domestic Violence Act if the domestic relationship continues."
      }
    ]
  },
  "pocso": {
    title: "Child Protection (POCSO Act)",
    icon: <BookOpen size={36} className="text-[#7C3AED]" />,
    intro: "The Protection of Children from Sexual Offences Act, 2012 (POCSO) strictly guards minors under the age of 18 against sexual assault, harassment, pornography, and exploitation.",
    faqs: [
      {
        question: "What is the age threshold under the POCSO Act?",
        answer: "The act defines a child as any person under the age of 18. Any sexual assault or touch against a minor is treated as a POCSO offense, irrespective of the child's consent."
      },
      {
        question: "Does the POCSO Act guarantee child confidentiality?",
        answer: "Yes. It is a severe offense to publish the name, address, school, photograph, or family details of the child victim in media or court filings. The child's identity must remain completely confidential."
      },
      {
        question: "What constitutes sexual harassment under POCSO?",
        answer: "Under POCSO, sexual harassment includes making sexual gestures, showing pornography, exposing sexual organs to a child, making physical contact with sexual intent, or capturing child exploitation material."
      },
      {
        question: "Who is required by law to report child sexual abuse?",
        answer: "Under Section 19 of the POCSO Act, any person (including teachers, doctors, neighbors, or relatives) who has knowledge or suspicion of child abuse is legally obligated to report it. Failure to do so is a punishable offense."
      },
      {
        question: "Where should POCSO cases be reported?",
        answer: "Cases must be reported to the Special Juvenile Police Unit (SJPU) or the local police. Alternatively, reports can be filed with the Child Welfare Committee (CWC) or via the Childline helpline 1098."
      },
      {
        question: "How are trials made child-friendly?",
        answer: "Children do not have to see the accused during court hearings (screens or video links are used). The court sits in a normal room (not a formal courtroom), police officers wear civilian clothes, and frequent breaks are allowed."
      },
      {
        question: "Can children be detained or arrested under POCSO?",
        answer: "A child victim of abuse cannot be detained or kept in a lock-up under any circumstances. They are provided immediate child protection, counseling, and shelter homes under the supervision of the CWC."
      },
      {
        question: "Are POCSO cases bailable for the accused?",
        answer: "No. All major offenses under the POCSO Act, including penetrative sexual assault and aggravated sexual assault, are non-bailable. The accused remains in custody during the investigation."
      }
    ]
  },
  "property-rights": {
    title: "Property & Ancestral Rights",
    icon: <Users size={36} className="text-[#F472B6]" />,
    intro: "The Hindu Succession (Amendment) Act, 2005 changed family law in India by giving daughters equal rights in ancestral and coparcenary properties, identical to sons.",
    faqs: [
      {
        question: "Do daughters have equal rights to ancestral property in India?",
        answer: "Yes. Since the amendment in 2005, daughters are coparceners (owners by birth) in Hindu Undivided Family (HUF) ancestral properties. They have the exact same rights and liabilities as sons."
      },
      {
        question: "Does the daughter's marital status affect her property rights?",
        answer: "No. A daughter's right to her ancestral property remains intact whether she is unmarried, married, widowed, or divorced. Marriage does not sever her coparcenary status in her birth family."
      },
      {
        question: "What if the father passed away before the 2005 amendment?",
        answer: "The Supreme Court of India ruled in 2020 (Vineeta Sharma v. Rakesh Sharma) that the right is by birth. Therefore, the daughter has equal coparcenary rights even if her father died before September 9, 2005."
      },
      {
        question: "Can a father write a will excluding his daughter from property?",
        answer: "A father can write a will for his self-acquired property, meaning property he bought with his own money. However, he cannot write a will excluding a daughter from her share in ancestral property, which belongs to all coparceners by birth."
      },
      {
        question: "What is the difference between ancestral and self-acquired property?",
        answer: "Ancestral property is inherited up to four generations of male lineage without partition. Self-acquired property is bought by a person individually using their own earnings. Owner of self-acquired property can gift or will it to anyone."
      },
      {
        question: "Do mothers have a share in a son's property?",
        answer: "Yes. Under the Hindu Succession Act, a mother is a Class I heir. If a son passes away without a will, his mother inherits an equal share of his property alongside his wife and children."
      },
      {
        question: "Do daughters have rights in their husband's ancestral property?",
        answer: "A wife does not have direct ownership rights in her husband's ancestral property. However, in the event of a divorce or his passing, she can claim maintenance and residence rights, and her children hold equal rights by birth."
      },
      {
        question: "What legal actions can a daughter take if denied her share?",
        answer: "A daughter can file a partition suit in a civil court to demand her share. She can also seek an injunction order to stop family members from selling the property until the court decides the case."
      }
    ]
  },
  "divorce": {
    title: "Divorce & Maintenance Rights",
    icon: <HelpCircle size={36} className="text-[#7C3AED]" />,
    intro: "Understanding the legal grounds for divorce, child custody rules, and securing maintenance under Section 125 of the Code of Criminal Procedure (CrPC) and personal laws.",
    faqs: [
      {
        question: "What are the common grounds for divorce in India?",
        answer: "Common grounds under the Hindu Marriage Act include cruelty (mental or physical), desertion (for at least 2 years), adultery, conversion to another religion, mental disorder, and mutual consent."
      },
      {
        question: "What is Mutual Consent Divorce?",
        answer: "If both husband and wife agree to divorce, they can file a petition for mutual consent. It is the fastest and least painful process, requiring a cooling-off period of 6 months (which can sometimes be waived)."
      },
      {
        question: "What is Section 125 CrPC maintenance?",
        answer: "Section 125 of the Code of Criminal Procedure is a secular law. It allows a wife, children, and parents who cannot maintain themselves to claim a monthly maintenance allowance from the husband who has sufficient means."
      },
      {
        question: "Can a wife get maintenance even if she is working?",
        answer: "Yes. If the wife's income is insufficient to maintain the standard of living she enjoyed in her matrimonial home, the court can order the husband to pay differential maintenance based on their income levels."
      },
      {
        question: "How is child custody decided in India?",
        answer: "Child custody is decided based on the 'welfare of the child' as the supreme consideration. Normally, custody of children under 5 years is given to the mother. For older children, the court may ask for the child's preference."
      },
      {
        question: "What is Alimony and how is it calculated?",
        answer: "Alimony is financial support paid during or after divorce. It can be a one-time lump sum or monthly payments. Courts generally calculate it as 20% to 25% of the husband's net monthly income."
      },
      {
        question: "What is interim maintenance?",
        answer: "Interim maintenance is financial support ordered by the court to cover the wife's living expenses and legal costs during the time the divorce or maintenance trial is still ongoing."
      },
      {
        question: "Do women have rights to the matrimonial home during divorce proceedings?",
        answer: "Yes. A wife has the right to occupy the matrimonial home during the pendency of divorce proceedings, even if the house is owned or rented solely in the husband's name."
      }
    ]
  }
};

export default function TopicDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const topic = topicData[slug];

  if (!topic) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-[#0D0F1A] flex flex-col justify-center items-center px-6">
          <h2 className="font-display text-2xl text-[#F9F5FF] mb-4">Topic Not Found</h2>
          <Link to="/topics" className="text-[#7C3AED] hover:underline flex items-center gap-2">
            <ArrowLeft size={16} /> Back to Topics
          </Link>
        </div>
      </PageTransition>
    );
  }

  // Links to other topics for the sidebar
  const otherTopics = Object.keys(topicData)
    .filter(key => key !== slug)
    .map(key => ({
      slug: key,
      title: topicData[key].title
    }));

  const prefilledQuery = `Help me understand more about my rights regarding ${topic.title}.`;

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#0D0F1A] pt-32 pb-24 relative w-full">
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-5 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:40px_40px]" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Back button */}
          <Link 
            to="/topics" 
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#C4B5FD] hover:text-[#F9F5FF] transition-colors mb-10 group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Topics
          </Link>

          {/* Page Body Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Left Content Area (Col Span 2) */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-white/5 border border-white/10 rounded-2xl text-[#7C3AED] shadow-inner">
                  {topic.icon}
                </div>
                <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F9F5FF]">
                  {topic.title}
                </h1>
              </div>

              <p className="text-sm sm:text-base text-[#C4B5FD] leading-relaxed mb-12 border-b border-white/5 pb-8 font-light">
                {topic.intro}
              </p>

              {/* FAQ Accordion block */}
              <div className="glass-panel rounded-2xl border border-white/5 overflow-hidden divide-y divide-white/5 shadow-2xl">
                {topic.faqs.map((faq, index) => (
                  <AccordionItem 
                    key={index}
                    question={faq.question}
                    answer={faq.answer}
                  />
                ))}
              </div>
            </div>

            {/* Right Sidebar (Col Span 1) */}
            <aside className="flex flex-col gap-8">
              {/* Ask LegalSaathi CTA Box */}
              <div className="glass-panel border border-[#7C3AED]/30 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-[#7C3AED]/5 pointer-events-none" />
                <h3 className="font-display font-bold text-lg text-[#F9F5FF] mb-2 flex items-center gap-2">
                  <MessageSquare size={18} className="text-[#F472B6]" />
                  Ask LegalSaathi
                </h3>
                <p className="text-xs text-[#C4B5FD] leading-relaxed mb-6">
                  Have specific queries about this topic? Get confidential, customized guidelines instantly.
                </p>
                
                <button
                  onClick={() => navigate('/chat', { state: { prefilledQuery } })}
                  className="w-full py-3 rounded-full bg-[#7C3AED] hover:bg-[#7C3AED]/90 text-white text-xs font-semibold uppercase tracking-wider transition-shadow hover:shadow-[0_0_20px_rgba(124,58,237,0.4)] cursor-pointer text-center block"
                >
                  Consult Chatbot
                </button>
              </div>

              {/* Other Topics Links */}
              <div className="glass-panel border border-white/5 rounded-2xl p-6 shadow-2xl">
                <h3 className="font-display font-bold text-lg text-[#F9F5FF] mb-4">
                  Other Legal Pillars
                </h3>
                <div className="flex flex-col gap-3">
                  {otherTopics.map((item, idx) => (
                    <Link
                      key={idx}
                      to={`/topics/${item.slug}`}
                      className="text-xs bg-white/5 hover:bg-white/10 border border-white/5 hover:border-[#7C3AED]/20 p-3.5 rounded-xl text-[#C4B5FD] hover:text-[#F9F5FF] font-medium transition-all"
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
            
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
