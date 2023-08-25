// __mocks__/tone.js

module.exports = {
    Synth: jest.fn().mockImplementation(() => ({
        toDestination: jest.fn().mockReturnThis(),
    })),
    start: jest.fn(),
};
