package com.toeicvocab.service;

import com.toeicvocab.domain.Word;
import com.toeicvocab.domain.Wordbook;
import com.toeicvocab.dto.request.WordRequest;
import com.toeicvocab.dto.response.WordResponse;
import com.toeicvocab.repository.WordRepository;
import com.toeicvocab.repository.WordbookRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class WordServiceTest {

    @Autowired
    private WordRepository wordRepository;

    @Autowired
    private WordbookRepository wordbookRepository;

    @Autowired
    private WordService wordService;

    private Wordbook beginnerWordbook;
    private Wordbook intermediateWordbook;
    private Wordbook advancedWordbook;

    @BeforeEach
    void setUp() {
        // 실제 데이터베이스에 단어장 저장
        beginnerWordbook = Wordbook.builder()
                .title("TOEIC 초급 단어장")
                .description("TOEIC 시험 대비 초급 단어장")
                .build();

        intermediateWordbook = Wordbook.builder()
                .title("TOEIC 중급 단어장")
                .description("TOEIC 시험 대비 중급 단어장")
                .build();

        advancedWordbook = Wordbook.builder()
                .title("TOEIC 고급 단어장")
                .description("TOEIC 시험 대비 고급 단어장")
                .build();

        // 저장 후 자동 생성된 ID 활용
        beginnerWordbook = wordbookRepository.save(beginnerWordbook);
        intermediateWordbook = wordbookRepository.save(intermediateWordbook);
        advancedWordbook = wordbookRepository.save(advancedWordbook);

        // 초급 단어 30개 추가
        addEasyWords();

        // 중급 단어 30개 추가
        addMediumWords();

        // 고급 단어 30개 추가
        addHardWords();
    }

    private void addEasyWords() {
        // 초급 단어 데이터 (30개)
        String[][] easyWords = {
                {"apple", "사과", "I eat an apple every day."},
                {"banana", "바나나", "Monkeys like to eat bananas."},
                {"book", "책", "I read a book before going to bed."},
                {"chair", "의자", "Please sit on this chair."},
                {"desk", "책상", "My laptop is on the desk."},
                {"door", "문", "Please close the door when you leave."},
                {"file", "파일", "Please send me the file by email."},
                {"good", "좋은", "You did a good job on the project."},
                {"house", "집", "I bought a new house last year."},
                {"job", "직업", "What is your job?"},
                {"key", "열쇠", "I lost my house key yesterday."},
                {"lunch", "점심", "Let's have lunch together."},
                {"money", "돈", "I need to save more money."},
                {"name", "이름", "What is your name?"},
                {"office", "사무실", "I work in an office downtown."},
                {"paper", "종이", "I need some paper to print this document."},
                {"question", "질문", "Do you have any questions?"},
                {"room", "방", "This hotel room is very spacious."},
                {"school", "학교", "My daughter goes to school by bus."},
                {"time", "시간", "What time is it now?"},
                {"use", "사용하다", "How do I use this machine?"},
                {"water", "물", "I drink two liters of water every day."},
                {"work", "일", "I have a lot of work to do today."},
                {"year", "년", "I lived in Seoul for one year."},
                {"zero", "영", "The temperature dropped to zero degrees."},
                {"friend", "친구", "She is my best friend from school."},
                {"family", "가족", "I have a small family with two children."},
                {"meeting", "회의", "We have a team meeting every Monday."},
                {"phone", "전화", "My phone battery is low."},
                {"computer", "컴퓨터", "I need to buy a new computer."}
        };

        for (String[] wordData : easyWords) {
            WordRequest wordRequest = new WordRequest();
            wordRequest.setWord(wordData[0]);            // 영단어
            wordRequest.setMeaning(wordData[1]);         // 한국어 의미
            wordRequest.setExample(wordData[2]);         // 예문
            wordRequest.setDifficultyLevel(Word.DifficultyLevel.EASY);  // 난이도
            wordRequest.setWordbookId(beginnerWordbook.getId());       // 단어장 ID

            wordService.createWord(wordRequest);
        }
    }

    private void addMediumWords() {
        // 중급 단어 데이터 (30개)
        String[][] mediumWords = {
                {"accomplish", "성취하다", "We accomplished all our goals for the quarter."},
                {"beneficial", "유익한", "Regular exercise is beneficial for your health."},
                {"collaborate", "협력하다", "Our teams need to collaborate on this project."},
                {"delegate", "위임하다", "A good manager knows when to delegate tasks."},
                {"efficient", "효율적인", "This new process is much more efficient."},
                {"facilitate", "촉진하다", "The software is designed to facilitate communication."},
                {"generate", "생성하다", "The company generated significant profits last year."},
                {"hesitate", "주저하다", "Don't hesitate to ask if you have questions."},
                {"implement", "실행하다", "We will implement the new policy next month."},
                {"justify", "정당화하다", "How can you justify this expensive purchase?"},
                {"maintain", "유지하다", "It's important to maintain good customer relationships."},
                {"negotiate", "협상하다", "We need to negotiate better terms for this contract."},
                {"optimize", "최적화하다", "The team is working to optimize our website performance."},
                {"prioritize", "우선순위를 정하다", "You need to prioritize your tasks for the day."},
                {"qualify", "자격을 갖추다", "He doesn't qualify for the position yet."},
                {"recruit", "모집하다", "We're recruiting new team members for our department."},
                {"strategy", "전략", "We need a new marketing strategy for this product."},
                {"temporary", "일시적인", "This is just a temporary solution to the problem."},
                {"utilize", "활용하다", "They didn't fully utilize the resources available to them."},
                {"verify", "확인하다", "Please verify that all the information is correct."},
                {"accommodate", "수용하다", "The hotel can accommodate up to 500 guests."},
                {"deadline", "마감 기한", "The deadline for this project is next Friday."},
                {"enhance", "향상시키다", "This feature will enhance user experience."},
                {"flexible", "유연한", "We need to be flexible with our schedule."},
                {"genuine", "진짜의", "He showed genuine interest in solving the problem."},
                {"impact", "영향", "The new regulations will have a significant impact on our business."},
                {"initiative", "주도권", "She took the initiative to start the new project."},
                {"potential", "잠재적인", "He has great potential as a leader."},
                {"reliable", "신뢰할 수 있는", "We need a reliable supplier for our components."},
                {"significant", "중요한", "There's been a significant improvement in your performance."}
        };

        for (String[] wordData : mediumWords) {
            WordRequest wordRequest = new WordRequest();
            wordRequest.setWord(wordData[0]);
            wordRequest.setMeaning(wordData[1]);
            wordRequest.setExample(wordData[2]);
            wordRequest.setDifficultyLevel(Word.DifficultyLevel.MEDIUM);
            wordRequest.setWordbookId(intermediateWordbook.getId());

            wordService.createWord(wordRequest);
        }
    }

    private void addHardWords() {
        // 고급 단어 데이터 (30개)
        String[][] hardWords = {
                {"acquisition", "인수", "The company announced a major acquisition yesterday."},
                {"ambiguous", "모호한", "The contract terms were too ambiguous and led to disagreements."},
                {"bureaucracy", "관료주의", "Excessive bureaucracy slows down decision-making processes."},
                {"calibrate", "조정하다", "The technician needs to calibrate the equipment regularly."},
                {"deficiency", "결핍", "The report highlighted several deficiencies in our security protocol."},
                {"elaborate", "정교한", "He gave an elaborate explanation of the new system."},
                {"fluctuation", "변동", "Market fluctuations have affected our quarterly profits."},
                {"hierarchy", "계층 구조", "The company has a well-defined hierarchy of management."},
                {"imminent", "임박한", "The launch of our new product is imminent."},
                {"imperative", "필수적인", "Meeting the deadline is imperative for this project."},
                {"indispensable", "필수적인", "Her expertise makes her indispensable to the team."},
                {"infrastructure", "기반 시설", "We need to invest more in our IT infrastructure."},
                {"jurisdiction", "관할권", "This case falls under the jurisdiction of the federal court."},
                {"leverage", "지렛대 효과", "We can leverage our existing customer base for the new product."},
                {"meticulous", "세심한", "The job requires meticulous attention to detail."},
                {"obscure", "모호한", "Some of the references in the document were obscure."},
                {"paradigm", "패러다임", "This represents a paradigm shift in how we approach software development."},
                {"procurement", "조달", "The procurement department handles all vendor relationships."},
                {"resilient", "탄력 있는", "Our network infrastructure is designed to be resilient to outages."},
                {"scrutinize", "면밀히 조사하다", "The auditors will scrutinize all financial transactions."},
                {"substantiate", "입증하다", "You need to substantiate your claims with concrete evidence."},
                {"sustainability", "지속 가능성", "Environmental sustainability is a core value of our company."},
                {"trajectory", "궤도", "The company's growth trajectory has exceeded expectations."},
                {"ubiquitous", "어디에나 있는", "Smartphones have become ubiquitous in modern society."},
                {"unprecedented", "전례 없는", "The company reported unprecedented growth in the last quarter."},
                {"vicinity", "인근", "There are several good restaurants in the vicinity of our office."},
                {"vulnerable", "취약한", "Small businesses are particularly vulnerable to economic downturns."},
                {"warranty", "보증", "The product comes with a two-year warranty."},
                {"zealous", "열성적인", "He's a zealous advocate for workplace diversity."},
                {"contingency", "우발적 사태", "We need a contingency plan in case the main server goes down."}
        };

        for (String[] wordData : hardWords) {
            WordRequest wordRequest = new WordRequest();
            wordRequest.setWord(wordData[0]);
            wordRequest.setMeaning(wordData[1]);
            wordRequest.setExample(wordData[2]);
            wordRequest.setDifficultyLevel(Word.DifficultyLevel.HARD);
            wordRequest.setWordbookId(advancedWordbook.getId());

            wordService.createWord(wordRequest);
        }
    }

    @Test
    void testWordbooksCreation() {
        // 단어장이 3개 생성되었는지 확인
        List<Wordbook> wordbooks = wordbookRepository.findAll();
        assertEquals(3, wordbooks.size(), "세 개의 단어장이 생성되어야 합니다.");

        // 각 단어장의 제목 확인
        boolean hasBeginnerWordbook = wordbooks.stream()
                .anyMatch(wb -> "TOEIC 초급 단어장".equals(wb.getTitle()));
        boolean hasIntermediateWordbook = wordbooks.stream()
                .anyMatch(wb -> "TOEIC 중급 단어장".equals(wb.getTitle()));
        boolean hasAdvancedWordbook = wordbooks.stream()
                .anyMatch(wb -> "TOEIC 고급 단어장".equals(wb.getTitle()));

        assertTrue(hasBeginnerWordbook, "초급 단어장이 생성되어야 합니다.");
        assertTrue(hasIntermediateWordbook, "중급 단어장이 생성되어야 합니다.");
        assertTrue(hasAdvancedWordbook, "고급 단어장이 생성되어야 합니다.");
    }

    @Test
    void testEasyWordsCreation() {
        // 초급 단어장의 단어 수 확인
        List<Word> easyWords = wordRepository.findByWordbook(beginnerWordbook);
        assertEquals(30, easyWords.size(), "초급 단어장에는 30개의 단어가 있어야 합니다.");

        // 모든 단어가 초급 난이도인지 확인
        for (Word word : easyWords) {
            assertEquals(Word.DifficultyLevel.EASY, word.getDifficultyLevel(),
                    "초급 단어장의 모든 단어는 EASY 난이도여야 합니다.");
        }

        // 특정 단어 확인 (예: "apple")
        boolean hasApple = easyWords.stream()
                .anyMatch(w -> "apple".equals(w.getWord()) && "사과".equals(w.getMeaning()));
        assertTrue(hasApple, "초급 단어장에 'apple'(사과) 단어가 있어야 합니다.");
    }

    @Test
    void testMediumWordsCreation() {
        // 중급 단어장의 단어 수 확인
        List<Word> mediumWords = wordRepository.findByWordbook(intermediateWordbook);
        assertEquals(30, mediumWords.size(), "중급 단어장에는 30개의 단어가 있어야 합니다.");

        // 모든 단어가 중급 난이도인지 확인
        for (Word word : mediumWords) {
            assertEquals(Word.DifficultyLevel.MEDIUM, word.getDifficultyLevel(),
                    "중급 단어장의 모든 단어는 MEDIUM 난이도여야 합니다.");
        }

        // 특정 단어 확인 (예: "collaborate")
        boolean hasCollaborate = mediumWords.stream()
                .anyMatch(w -> "collaborate".equals(w.getWord()) && "협력하다".equals(w.getMeaning()));
        assertTrue(hasCollaborate, "중급 단어장에 'collaborate'(협력하다) 단어가 있어야 합니다.");
    }

    @Test
    void testHardWordsCreation() {
        // 고급 단어장의 단어 수 확인
        List<Word> hardWords = wordRepository.findByWordbook(advancedWordbook);
        assertEquals(30, hardWords.size(), "고급 단어장에는 30개의 단어가 있어야 합니다.");

        // 모든 단어가 고급 난이도인지 확인
        for (Word word : hardWords) {
            assertEquals(Word.DifficultyLevel.HARD, word.getDifficultyLevel(),
                    "고급 단어장의 모든 단어는 HARD 난이도여야 합니다.");
        }

        // 특정 단어 확인 (예: "acquisition")
        boolean hasAcquisition = hardWords.stream()
                .anyMatch(w -> "acquisition".equals(w.getWord()) && "인수".equals(w.getMeaning()));
        assertTrue(hasAcquisition, "고급 단어장에 'acquisition'(인수) 단어가 있어야 합니다.");
    }

    @Test
    void testGetWordsByWordbook() {
        // WordService를 통해 각 단어장의 단어들을 조회
        List<WordResponse> easyWords = wordService.getWordsByWordbook(beginnerWordbook.getId());
        List<WordResponse> mediumWords = wordService.getWordsByWordbook(intermediateWordbook.getId());
        List<WordResponse> hardWords = wordService.getWordsByWordbook(advancedWordbook.getId());

        // 각 단어장의 단어 수 확인
        assertEquals(30, easyWords.size(), "초급 단어장에는 30개의 단어가 있어야 합니다.");
        assertEquals(30, mediumWords.size(), "중급 단어장에는 30개의 단어가 있어야 합니다.");
        assertEquals(30, hardWords.size(), "고급 단어장에는 30개의 단어가 있어야 합니다.");

        // 각 단어장의 단어들이 올바른 난이도를 가지고 있는지 확인
        assertTrue(easyWords.stream().allMatch(w -> w.getDifficultyLevel() == Word.DifficultyLevel.EASY),
                "초급 단어장의 모든 단어는 EASY 난이도여야 합니다.");
        assertTrue(mediumWords.stream().allMatch(w -> w.getDifficultyLevel() == Word.DifficultyLevel.MEDIUM),
                "중급 단어장의 모든 단어는 MEDIUM 난이도여야 합니다.");
        assertTrue(hardWords.stream().allMatch(w -> w.getDifficultyLevel() == Word.DifficultyLevel.HARD),
                "고급 단어장의 모든 단어는 HARD 난이도여야 합니다.");
    }
}