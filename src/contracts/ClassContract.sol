// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ClassContract {
    struct Lecture {
        uint256 id;
        string title;
        uint256 timestamp;
        uint256 validityPeriod;
        mapping(address => bool) attendance;
    }

    string public className;
    address public teacher;
    mapping(address => bool) public enrolledStudents;
    mapping(uint256 => Lecture) public lectures;
    uint256 public lectureCount;

    event LectureCreated(uint256 lectureId, string title, uint256 timestamp);
    event AttendanceMarked(uint256 lectureId, address student);

    constructor(
        string memory _className,
        address _teacher,
        address[] memory _students
    ) {
        className = _className;
        teacher = _teacher;
        for (uint i = 0; i < _students.length; i++) {
            enrolledStudents[_students[i]] = true;
        }
    }

    modifier onlyTeacher() {
        require(msg.sender == teacher, "Only teacher can call this");
        _;
    }

    modifier onlyEnrolled() {
        require(enrolledStudents[msg.sender], "Only enrolled students can call this");
        _;
    }

    function createLecture(string memory _title, uint256 _validityPeriod) 
        external 
        onlyTeacher 
        returns (uint256)
    {
        uint256 lectureId = lectureCount++;
        Lecture storage newLecture = lectures[lectureId];
        newLecture.id = lectureId;
        newLecture.title = _title;
        newLecture.timestamp = block.timestamp;
        newLecture.validityPeriod = _validityPeriod;

        emit LectureCreated(lectureId, _title, block.timestamp);
        return lectureId;
    }

    function markAttendance(uint256 _lectureId) 
        external 
        onlyEnrolled 
    {
        Lecture storage lecture = lectures[_lectureId];
        require(block.timestamp <= lecture.timestamp + lecture.validityPeriod, "Attendance window closed");
        require(!lecture.attendance[msg.sender], "Attendance already marked");

        lecture.attendance[msg.sender] = true;
        emit AttendanceMarked(_lectureId, msg.sender);
    }
}