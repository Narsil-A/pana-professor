from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from classes.models import Class
import uuid

User = get_user_model()

class Command(BaseCommand):
    help = 'Seed the database with initial data'

    def handle(self, *args, **options):
        self.stdout.write('Seeding data...')

        # Create users
        user1 = User.objects.create_user(username='john', name='John Doe', email='john@example.com', password='testingpassword12')
        user2 = User.objects.create_user(username='laura_holmes', name='laura holmes', email='laura_holmes@example.com', password='notestingpassword34')
        user3 = User.objects.create_user(username='franklin', name='Franklin Salazar', email='franklin@example.com', password='testingpassword33')
        user4 = User.objects.create_user(username='analia', name='Analia Andrade', email='analia@example.com', password='testingpassword3334')

        # Create classes
        Class.objects.create(
            id=uuid.uuid4(),
            title='Math 101',
            category='math',
            description='Introduction to Math',
            price_per_session=100,
            duration_in_minutes=60,
            max_students=30,
            subject='Math',
            professor=user1,
            image='uploads/classes/profesor1.jpeg',
            video_480p='uploads/classes/vectors_480p.mp4',
            video_720p='uploads/classes/vectors_720p.mp4',
            video_1080p='uploads/classes/vectors_1080p.mp4',
            subtitles=[
                {'src': 'http://localhost:8000/media/uploads/classes/subtitles/vector_english.vtt', 'lang': 'en', 'label': 'English'},
                {'src': 'http://localhost:8000/media/uploads/classes/subtitles/vector_spanish.vtt', 'lang': 'es', 'label': 'Spanish'},
            ]
        )

        Class.objects.create(
            id=uuid.uuid4(),
            title='Programming 101',
            category='technology',
            description='Introduction to Programming',
            price_per_session=1,
            duration_in_minutes=30,
            max_students=20,
            subject='Technology',
            professor=user2,
            image='uploads/classes/laura_holmes.jpeg',
            video_480p='uploads/classes/programming_480p.mp4',
            video_720p='uploads/classes/programming_720p.mp4',
            video_1080p='uploads/classes/programming_1080p.mp4',
            subtitles=[
                {'src': 'http://localhost:8000/media/uploads/classes/subtitles/programming_english.vtt', 'lang': 'en', 'label': 'English'},
                {'src': 'http://localhost:8000/media/uploads/classes/subtitles/programming_spanish.vtt', 'lang': 'es', 'label': 'Spanish'},
            ]
        )

        Class.objects.create(
            id=uuid.uuid4(),
            title='bilingüe Brain',
            category='languages',
            description='Las ventajas de un cerebro bilingüe',
            price_per_session=1,
            duration_in_minutes=30,
            max_students=20,
            subject='Languages',
            professor=user3,
            image='uploads/classes/lenguage1.jpg',
            video_480p='uploads/classes/lenguage_480p.mp4',
            video_720p='uploads/classes/lenguage_720p.mp4',
            video_1080p='uploads/classes/lenguage_1080p.mp4',
            subtitles=[
                {'src': 'http://localhost:8000/media/uploads/classes/subtitles/lenguage_english.vtt', 'lang': 'en', 'label': 'English'},
                {'src': 'http://localhost:8000/media/uploads/classes/subtitles/lenguage_spanish.vtt', 'lang': 'es', 'label': 'Spanish'},
            ]
        )

        Class.objects.create(
            id=uuid.uuid4(),
            title='Arts',
            category='arts',
            description='Who decides what art means?',
            price_per_session=1,
            duration_in_minutes=30,
            max_students=20,
            subject='Arts',
            professor=user3,
            image='uploads/classes/arts.jpeg',
            video_480p='uploads/classes/arts_480p.mp4',
            video_720p='uploads/classes/arts_720p.mp4',
            video_1080p='uploads/classes/arts_1080p.mp4',
            subtitles=[
                {'src': 'http://localhost:8000/media/uploads/classes/subtitles/arts_english.vtt', 'lang': 'en', 'label': 'English'},
                {'src': 'http://localhost:8000/media/uploads/classes/subtitles/arts_spanish.vtt', 'lang': 'es', 'label': 'Spanish'},
            ]
        )


        Class.objects.create(
            id=uuid.uuid4(),
            title='The science of laughter ',
            category='science',
            description='The science of laughter ',
            price_per_session=1,
            duration_in_minutes=30,
            max_students=20,
            subject='Science',
            professor=user4,
            image='uploads/classes/science.jpg',
            video_480p='uploads/classes/science_480p.mp4',
            video_720p='uploads/classes/science_720p.mp4',
            video_1080p='uploads/classes/science_1080p.mp4',
            subtitles=[
                {'src': 'http://localhost:8000/media/uploads/classes/subtitles/science_english.vtt', 'lang': 'en', 'label': 'English'},
                {'src': 'http://localhost:8000/media/uploads/classes/subtitles/science_spanish.vtt', 'lang': 'es', 'label': 'Spanish'},
            ]
        )
        self.stdout.write(self.style.SUCCESS('Data successfully seeded!'))