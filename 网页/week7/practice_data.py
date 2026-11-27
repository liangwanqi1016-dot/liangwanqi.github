# coding: utf-8
"""Fictional classroom recommendations, never presented as real restaurant reviews."""
import secrets

MENUS = [
    (('비빔밥','채소와 밥을 비벼 먹는 든든한 한 끼','고추장은 따로 받아 맵기를 조절해요'),('韩式拌饭','蔬菜和米饭搭配，适合作为一顿正餐','辣酱单独放，按自己的口味添加'),('Bibimbap','A filling bowl of rice and vegetables','Keep the chili paste on the side to adjust the heat')),
    (('김밥','이동 전 간단히 챙기기 좋은 메뉴','국물이나 따뜻한 차를 곁들이면 좋아요'),('紫菜包饭','方便分食，赶课前也能简单吃一餐','可以搭配热汤或温茶'),('Gimbap','Easy to share or pack before class','Pair it with warm soup or tea')),
    (('떡볶이','친구와 나누기 좋은 매콤한 간식','매운맛이 부담되면 순한맛을 골라요'),('辣炒年糕','适合和朋友分享的热乎小吃','不太能吃辣时，可以选择微辣口味'),('Tteokbokki','A warm spicy snack to share with friends','Choose mild sauce if you prefer less heat')),
    (('만둣국','맵지 않은 따뜻한 국물이 생각날 때','만두와 국물을 천천히 함께 먹어요'),('饺子汤','想吃清淡、温热的一餐时可以考虑','配米饭或小菜，慢慢享用'),('Dumpling soup','A gentle choice when you want a warm meal','Enjoy slowly with rice or a side dish')),
    (('김치찌개','따뜻하고 든든하게 먹고 싶은 점심','자극적인 맛이 부담되면 다른 메뉴와 비교해요'),('泡菜汤','适合想吃热汤和米饭的午餐','偏辣时可以搭配清淡的小菜'),('Kimchi stew','A comforting lunch with hot soup and rice','Balance the spice with a mild side dish')),
    (('요거트 볼','가볍게 먹고 싶은 아침 메뉴','과일과 토핑은 취향에 맞게 골라요'),('酸奶碗','适合想吃轻一点的早餐','水果和配料可以按自己的喜好选择'),('Yogurt bowl','A lighter breakfast idea','Choose fruit and toppings to suit your taste')),
    (('도시락','반찬을 골고루 먹고 싶은 날','남은 수업 시간을 생각하며 천천히 먹어요'),('韩式便当','适合想让主食和配菜搭配丰富一点的时候','可以按照当天食量选择份量'),('Dosirak','A varied meal with rice and side dishes','Pick a portion that suits your appetite')),
    (('호떡과 차','공부 후 달콤한 간식이 생각날 때','속이 뜨거울 수 있으니 조금 식혀 먹어요'),('糖饼和热茶','学习后想吃一点甜食时可以考虑','糖饼内馅可能较热，稍放凉再吃'),('Hotteok and tea','A sweet break after studying','Let the filling cool a little before eating')),
]
SCENES = {
    'ko': ['수업 사이 점심', '도서관 공부 뒤', '친구와 함께하는 식사', '동아리 활동 전', '한가한 공강 시간'],
    'zh': ['课间午餐', '图书馆学习后', '和朋友一起吃饭', '社团活动前', '比较宽裕的空课时间'],
    'en': ['Lunch between classes', 'After studying in the library', 'A meal with friends', 'Before a club meeting', 'A relaxed break between classes'],
}
NOTES = {
    'ko': ['추천 포인트: 메뉴를 나눠 먹으며 다음 수업 이야기를 해 보세요.', '추천 포인트: 급하게 먹기보다 잠깐 쉬어 가는 한 끼로 골랐어요.', '추천 포인트: 매운맛·양은 함께 먹는 친구와 먼저 상의해요.'],
    'zh': ['推荐理由：可以边吃边聊下一节课，让吃饭也成为放松时间。', '推荐理由：比起匆忙解决，更想把这一餐当成课间的小休息。', '推荐理由：一起吃之前，先和朋友商量辣度与份量会更合适。'],
    'en': ['Why: Share a meal and chat about the next class.', 'Why: Turn a rushed meal into a short, relaxing break.', 'Why: Agree on spice level and portions with your friend first.'],
}

def make_recommendations(language='ko', existing=()):
    language = language if language in SCENES else 'ko'
    lang_index = {'ko': 0, 'zh': 1, 'en': 2}[language]
    rng = secrets.SystemRandom()
    used = set(existing)
    result = []
    for menu in rng.sample(MENUS, 4):
        dish, description, tip = menu[lang_index]
        for _ in range(40):
            scene, note = rng.choice(SCENES[language]), rng.choice(NOTES[language])
            if language == 'zh':
                content = f'[练习·虚构] {dish}｜{scene}\n{description}。{tip}。\n{note}\n仅用于测试推荐、举报与管理，不是真实商家评价。'
            elif language == 'en':
                content = f'[DEMO · FICTIONAL] {dish} | {scene}\n{description}. {tip}.\n{note}\nFor testing posts, reports and moderation; not a real restaurant review.'
            else:
                content = f'[연습·가상] {dish} | {scene}\n{description}. {tip}.\n{note}\n추천·신고·관리 기능 테스트용이며 실제 식당 후기가 아닙니다.'
            if content not in used:
                break
        else:
            # Keep uniqueness without changing real records, even after many practice batches.
            content += '\n#' + secrets.token_hex(3)
        used.add(content)
        result.append(content)
    return result
