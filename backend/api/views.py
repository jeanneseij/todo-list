from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserSerializer
from rest_framework.exceptions import ValidationError

from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
    
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token

from .models import Task
from .serializers import TaskSerializer

from django.shortcuts import get_object_or_404


class UserRegister(APIView):
    def post(self, request, *args, **kwargs):
        serializer = UserSerializer(data=request.data)
        try:
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        except ValidationError as e:
            # Customizing the error response structure
            custom_error_response = {
                "error": "This user is already registered.",
                "details": e.detail
            }
            return Response(custom_error_response, status=status.HTTP_400_BAD_REQUEST)


class UserLogin(APIView):
    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)
        if user:
            token, _ = Token.objects.get_or_create(user=user)
            return Response({'token': token.key, 'user_id': user.id}, status=status.HTTP_200_OK)
        return Response({'detail': 'Invalid Credentials'}, status=status.HTTP_400_BAD_REQUEST)


class TaskCreate(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def post(self, request, *args, **kwargs):
        serializer = TaskSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TaskList(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self, request, *args, **kwargs):
        tasks = Task.objects.filter(user=request.user).order_by('priority', 'deadline')
        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    

class TaskUpdate(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def put(self, request, id, *args, **kwargs):
        task = Task.objects.get(id=id, user=request.user)
        serializer = TaskSerializer(task, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TaskDelete(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def delete(self, request, id, *args, **kwargs):
        print("Delete method called with ID:", id)
        print("User:", request.user)
        task = get_object_or_404(Task, id=id, user=request.user)
        task.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class TaskCompleteUpdate(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def patch(self, request, id, *args, **kwargs):
        task = get_object_or_404(Task, id=id, user=request.user)
        completed = request.data.get('completed')
        if completed is not None:
            task.completed = completed
            task.save(update_fields=['completed'])
            return Response({'status': 'Task completion status updated'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Completed status not provided'}, status=status.HTTP_400_BAD_REQUEST)